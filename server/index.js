const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Models
const Post = require('./models/Post');
const User = require('./models/User');
const Comment = require('./models/Comment');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;



// Enable CORS for specific origin
app.use(cors({
    origin: ['http://localhost:3000', 'https://www.iyaltamil.com', 'https://iyaltamil.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
// Middleware
app.use(cors());
app.use(express.json());

/**
 * MongoDB Connection
 */
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("\n-------------------------------------------");
  console.log("✅ MongoDB Connected Successfully!");
  console.log("🚀 IyalTamil API is ready at http://localhost:" + PORT);
  console.log("-------------------------------------------\n");
})
.catch(err => {
  console.error("\n❌ MongoDB Connection Error:", err.message);
  console.log("💡 HINT: Check if your IP is whitelisted in MongoDB Atlas.");
});

/**
 * Helpers
 */
async function attachCommentCounts(posts) {
  if (!posts.length) return posts;
  const ids = posts.map(p => p._id);
  const counts = await Comment.aggregate([
    { $match: { postId: { $in: ids } } },
    { $group: { _id: '$postId', count: { $sum: 1 } } }
  ]);
  const countMap = {};
  counts.forEach(c => { countMap[String(c._id)] = c.count; });
  return posts.map(p => {
    const obj = p.toJSON ? p.toJSON() : { ...p };
    obj.commentCount = countMap[String(obj._id)] || 0;
    return obj;
  });
}

/**
 * API ROUTES
 */

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'online', message: 'IyalTamil Server is healthy' });
});

// 2. Posts - Get All
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    const withCounts = await attachCommentCounts(posts);
    res.json(withCounts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// 3. Posts - Create New
app.post('/api/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: "Error saving post", details: err.message });
  }
});

// 3b. Posts - Get single post
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const [withCount] = await attachCommentCounts([post]);
    res.json(withCount);
  } catch (err) {
    res.status(500).json({ message: "Error fetching post", details: err.message });
  }
});

// 3c. Posts - Update (Edit Creation)
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
      id,
      { ...(title != null && { title }), ...(content != null && { content }) },
      { new: true, runValidators: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: "Error updating post", details: err.message });
  }
});

// 3c-2. Posts - Delete (with ownership check)
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const postAuthorId = String(post.author._id || post.author.id);
    if (postAuthorId !== String(req.body.userId)) {
      return res.status(403).json({ message: "You are not the owner of this post" });
    }

    await Post.findByIdAndDelete(id);
    await Comment.deleteMany({ postId: id });

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", details: err.message });
  }
});

// 3e. Posts - Toggle Like
app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const uid = String(userId);
    const likedBy = post.likedBy || [];
    const alreadyLiked = likedBy.includes(uid);

    if (alreadyLiked) {
      post.likedBy = likedBy.filter(x => x !== uid);
    } else {
      post.likedBy = [...likedBy, uid];
    }
    await post.save();

    res.json({ liked: !alreadyLiked, likeCount: post.likedBy.length, likedBy: post.likedBy });
  } catch (err) {
    res.status(500).json({ message: "Error toggling like", details: err.message });
  }
});

// 3f. Favorites - Get posts liked by a user
app.get('/api/favorites/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ likedBy: req.params.userId }).sort({ createdAt: -1 }).lean();
    const withCounts = await attachCommentCounts(posts);
    res.json(withCounts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching favorites", details: err.message });
  }
});

// 3g. Comments - Get by post
app.get('/api/posts/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id })
      .sort({ createdAt: 1 })
      .lean();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments", details: err.message });
  }
});

// 3e. Comments - Create
app.post('/api/comments', async (req, res) => {
  try {
    const { postId, text, author } = req.body;
    if (!postId || !text || !text.trim()) {
      return res.status(400).json({ message: "postId and text are required" });
    } 
   
    const comment = new Comment({
      postId,
      text: text.trim(),
      ...(author && { author }),
    });
    const saved = await comment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error saving comment", details: err.message });
  }
});

// 4. Auth - Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Simple check if user exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "மின்னஞ்சல் ஏற்கனவே உள்ளது (Email already exists)" });

    const user = new User({ email, password, name: email.split('@')[0] });
    await user.save();
    
    res.status(201).json({ 
      user: { id: user._id, name: user.name, email: user.email },
      token: "mock-jwt-token-" + Date.now() 
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// 5. Auth - Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    
    if (!user) {
      return res.status(401).json({ message: "தவறான விவரங்கள் (Invalid credentials)" });
    }
    
    res.json({ 
      user: { id: user._id, name: user.name, email: user.email },
      token: "mock-jwt-token-" + Date.now()
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

// Fetch posts by the logged-in user
app.get('/api/posts/author/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ 'author.id': req.params.userId }).lean();
    const withCounts = await attachCommentCounts(posts);
    res.json(withCounts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user posts", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`📡 Backend listening on port ${PORT}`);
});