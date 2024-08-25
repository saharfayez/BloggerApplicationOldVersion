import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Authentication Service/auth.service';
import { BlogService } from '../../services/Blog Service/blogservice.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule , 
    MatCardModule
  ],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent {
  addBlogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router
  ) {
    this.addBlogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addBlogForm.valid) {
      const { title, content } = this.addBlogForm.value;
      const author = this.authService.getCurrentUser()!;
      this.blogService.createPost(title, content, author);
      this.router.navigate(['/']); // Redirect to home page after adding a post
    }
  }
}
