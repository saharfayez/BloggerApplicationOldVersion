import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/autheguard.service';
import { BlogService } from '../services/blogservice.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  posts: any[] = [];
  isLoggedIn = false;
  currentUser = '';

  constructor(
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.updateLoginState();
    this.posts = this.blogService.getAllPosts();
  }

  updateLoginState() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.currentUser = this.authService.getCurrentUser()!;
    }
  }

  canEditOrDelete(postAuthor: string): boolean {
    return this.isLoggedIn && postAuthor === this.currentUser;
  }

  redirectToLogin() {
    console.log('Navigating to login page'); // Debug line
    this.router.navigate(['/login']);
  }

  redirectToAddPost() {
    console.log('Navigating to Add Blog page'); // Debug line
    this.router.navigate(['/add-blog']).then(success => {
      if (success) {
        console.log('Navigation to Add Blog page successful');
      } else {
        console.log('Navigation to Add Blog page failed');
      }
    });
  }

  logout() {
    this.authService.logout();
    this.updateLoginState();
    this.router.navigate(['/login']);
  }

  editPost(postId: number): void {
    this.router.navigate(['/edit-blog', postId]); // Navigate to the 'Edit Blog' component with post ID
  }

  deletePost(postId: number) {
    const post = this.blogService.getPostById(postId);
    if (post && this.authService.getCurrentUser() === post.author) {
      this.blogService.deletePost(postId, post.author);
      this.posts = this.blogService.getAllPosts(); // Refresh post list
    }
  }
}
