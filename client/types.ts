export type Category = 'கவிதை' | 'கட்டுரை' | 'மேற்கோள்' | 'கதை' | 'பொன்மொழி' | 'ஊக்கம்' | 'வரலாறு' | 'பழமொழி';

export interface User {
  id: string | number;
  name: string;
  // Added email property to fix type errors in client/services/api.ts
  email?: string;
  avatarUrl?: string;
}

export interface Comment {
  id: number;
  user: User;
  text: string;
  createdAt: string;
}

export interface Post {
  _id: string; // MongoDB ID
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    email?: string;
    avatarUrl?: string;
  };
  category: string;
  likedBy: string[];
  comments: any[];
  commentCount: number;
  createdAt: string;
  __v?: number;
}

export interface ClassicalVerse {
  text: string;
  explanation?: string;
}

export interface ClassicalChapter {
    chapter: string;
    verses: ClassicalVerse[];
}

export interface ClassicalSection {
    id: string;
    title: string;
    description?: string;
    chapters: ClassicalChapter[];
}

export interface ClassicalWork {
    id: string;
    title: string;
    author: string;
    description: string;
    content?: ClassicalChapter[]; 
    sections?: ClassicalSection[];
}

export interface Competition {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: 'active' | 'completed' | 'upcoming';
  prize: string;
  imageUrl?: string;
}