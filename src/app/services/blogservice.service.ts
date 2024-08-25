import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  // Retrieve all blog posts
  getAllPosts(): any[] {
    let posts = JSON.parse(localStorage.getItem('posts') || '[]');

    // If no posts exist, return some default posts
    if (posts.length === 0) {
      posts = [
        {
          id: 1,
          title: 'The Future of Web Development',
          content:
            'Web development is continuously evolving, and the future promises even more exciting innovations.',
          author: 'John Doe',
        },
        {
          id: 2,
          title: 'Understanding Angular 18',
          content:
            'Angular 18 brings new features and improvements. This guide will walk you through everything you need to know.',
          author: 'Jane Smith',
        },
        {
          id: 3,
          title: 'Introduction to TypeScript',
          content:
            'TypeScript is a powerful tool for writing maintainable JavaScript code. Learn the basics in this introduction.',
          author: 'Alex Brown',
        },
      ];
      localStorage.setItem('posts', JSON.stringify(posts));
    }

    return posts;
  }
  // Retrieve a single post by ID
  getPostById(id: number): any {
    const posts = this.getAllPosts();
    return posts.find((post: any) => post.id === id);
  }

  // Create a new blog post
  createPost(title: string, content: string, author: string): void {
    const posts = this.getAllPosts();
    
    // Create a new post object
    const newPost = {
      id: new Date().getTime(), // Use timestamp as unique ID
      title,
      content,
      author, // Set the author's username
    };

    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts)); // Save the updated list of posts
  }

  // Update an existing post
  updatePost(id: number, title: string, content: string): boolean {
    const posts = this.getAllPosts();
    const postIndex = posts.findIndex((post: any) => post.id === id);

   
      // Only allow update if the author matches
      posts[postIndex] = { ...posts[postIndex], title, content };
      localStorage.setItem('posts', JSON.stringify(posts));
      return true;
    

    return false; // Post not found or user is not authorized
  }

  // Delete a post
  deletePost(id: number, author: string): boolean {
    let posts = this.getAllPosts();
    const postIndex = posts.findIndex((post: any) => post.id === id);

    if (postIndex !== -1 && posts[postIndex].author === author) {
      // Only allow delete if the author matches
      posts = posts.filter((post: any) => post.id !== id);
      localStorage.setItem('posts', JSON.stringify(posts));
      return true;
    }

    return false; // Post not found or user is not authorized
  }
}
