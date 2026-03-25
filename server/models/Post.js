const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  // Updated: Changed type to Mixed/Object to support storing User objects (id, name, avatarUrl)
  // instead of just a string, ensuring compatibility with frontend components that expect post.author.name.
  author: {
    type: mongoose.Schema.Types.Mixed,
    default: { id: 0, name: "Anonymous" }
  },
  // Updated: Changed default category to "கவிதை" (Poem in Tamil) to match the union type Category in the frontend.
  category: {
    type: String,
    default: "கவிதை"
  },
  likedBy: {
    type: [String],
    default: []
  },
  // Added comments field to match the frontend Post type
  comments: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);