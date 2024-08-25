import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface BlogDB extends DBSchema {
  posts: {
    key: number;
    value: {
      id: number;
      title: string;
      content: string;
      author: string;
    };
    indexes: { 'by-author': string };
  };
}

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  private dbPromise!: Promise<IDBPDatabase<BlogDB>>;

  constructor() {
    this.initDB();
  }

  
  private initDB() {
    this.dbPromise = openDB<BlogDB>('blog-database', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('posts')) {
          const store = db.createObjectStore('posts', {
            keyPath: 'id',
            autoIncrement: true,
          });
          store.createIndex('by-author', 'author');
        }
      },
    });
  }


  async addPost(post: { id: number; title: string; content: string; author: string }) {
    const db = await this.dbPromise;
    await db.add('posts', post);
  }

  
  async getAllPosts() {
    const db = await this.dbPromise;
    return db.getAll('posts');
  }

  // Get a post by ID from IndexedDB
  async getPostById(id: number) {
    const db = await this.dbPromise;
    return db.get('posts', id);
  }

  // Update a post in IndexedDB
  async updatePost(post: { id: number; title: string; content: string }) {
    const db = await this.dbPromise;
    
    // Fetch the existing post to retain the author info
    const existingPost = await db.get('posts', post.id);
    
    if (existingPost) {
      // Update the post with the new title and content while keeping the author
      const updatedPost = { ...existingPost, ...post };
      await db.put('posts', updatedPost);
    }
  }
  // Delete a post from IndexedDB
  async deletePost(id: number) {
    const db = await this.dbPromise;
    await db.delete('posts', id);
  }
}
