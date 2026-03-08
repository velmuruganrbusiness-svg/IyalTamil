import type { Post, User } from '../types';
/////// API Service for interacting with backend endpoints
export interface CommentResponse {
  id: string;
  text: string;
  createdAt: string;
  user: { id: string; name: string };
}

// const API_URL = 'http://localhost:5000/api';
const API_URL = 'http://127.0.0.1:5000/api';
export const api = {
  // Check if server is reachable
  checkHealth: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  },

  // Fetch all posts from MongoDB
  getPosts: async (): Promise<Post[]> => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch posts');
      }
      return await response.json();
    } catch (error: any) {
      console.error("API getPosts Error:", error.message);
      throw error;
    }
  },

  // Save a new post to MongoDB
  createPost: async (postData: Partial<Post>): Promise<Post | null> => {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(err.message || 'Failed to create post');
      }
      return await response.json();
    } catch (error: any) {
      console.error("API createPost Error:", error.message);
      throw error;
    }
  },

  // Get single post
  getPost: async (id: string): Promise<Post | null> => {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  },

  // Update post (Edit Creation)
  updatePost: async (id: string, data: { title?: string; content?: string }): Promise<Post | null> => {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(body.message || (response.status === 404 ? 'Post not found. Refresh the page and try again.' : 'Failed to update post'));
      }
      return body as Post;
    } catch (error: any) {
      console.error("API updatePost Error:", error.message);
      throw error;
    }
  },

  // Get comments for a post
  getComments: async (postId: string): Promise<CommentResponse[]> => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}/comments`);
      if (!response.ok) return [];
      const list = await response.json();
      return (list || []).map((c: any) => ({
        id: c._id ?? c.id,
        text: c.text,
        createdAt: c.createdAt,
        user: c.author ? { id: c.author.id ?? c.author._id, name: c.author.name ?? 'வாசகர்' } : { id: '', name: 'வாசகர்' },
      }));
    } catch {
      return [];
    }
  },

  // Create comment
  createComment: async (postId: string, text: string, author?: User): Promise<CommentResponse | null> => {
    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, text: text.trim(), author }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to add comment');
      }
      const c = await response.json();
      return {
        id: c._id ?? c.id,
        text: c.text,
        createdAt: c.createdAt,
        user: c.author ? { id: c.author.id ?? c.author._id, name: c.author.name ?? 'வாசகர்' } : { id: '', name: 'வாசகர்' },
      };
    } catch (error: any) {
      console.error("API createComment Error:", error.message);
      throw error;
    }
  },

  // Auth - Login
  login: async (credentials: any): Promise<{ user: User; token: string }> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'உள்நுழைவு தோல்வியடைந்தது (Login failed)');
      }
      return data;
    } catch (error: any) {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('சர்வர் இணைப்பில் இல்லை (Server is offline. Check your backend)');
      }
      throw error;
    }
  },

  // Auth - Register
  register: async (userData: any): Promise<{ user: User; token: string }> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'பதிவு தோல்வியடைந்தது (Registration failed)');
      }
      return data;
    } catch (error: any) {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('சர்வர் இணைப்பில் இல்லை (Server is offline. Check your backend)');
      }
      throw error;
    }
  }
};