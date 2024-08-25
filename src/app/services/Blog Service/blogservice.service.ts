import { Injectable } from '@angular/core';
import { IndexedDBService } from '../IndexedDB Service/indexeddb.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private indexedDBService: IndexedDBService) {}

  // Retrieve all blog posts
  async getAllPosts(): Promise<any[]> {
    return await this.indexedDBService.getAllPosts();
  }

  // Retrieve a single post by ID
  async getPostById(id: number): Promise<any> {
    return await this.indexedDBService.getPostById(id);
  }

  // Create a new blog post
  async createPost(title: string, content: string, author: string): Promise<void> {
    const post = {
      id: new Date().getTime(), // Use timestamp as unique ID
      title,
      content,
      author,
    };
    await this.indexedDBService.addPost(post);
  }

  // Update an existing post
  async updatePost(id: number, title: string, content: string): Promise<boolean> {
    const post = await this.indexedDBService.getPostById(id);
   
      await this.indexedDBService.updatePost({ id, title, content });
      return true;
    

  }

  // Delete a post
  async deletePost(id: number, author: string): Promise<boolean> {
    const post = await this.indexedDBService.getPostById(id);
    if (post && post.author === author) {
      await this.indexedDBService.deletePost(id);
      return true;
    }
    return false;
  }
}
