import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blogservice.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [ReactiveFormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule , 
    MatCardModule],
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  blogForm: FormGroup;
  blogId!: number;
  author!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private blogService: BlogService
  ) {
    // Initialize the form group
    this.blogForm = this.fb.group({
      title: [''],
      content: ['']
    });
  }

  ngOnInit(): void {
     this.blogId = +this.route.snapshot.paramMap.get('id')!;
    // console.log('Blog ID:', this.blogId);
    // this.author = localStorage.getItem('loggedInUser') || 'unknown';
    // console.log('Author:', this.author);
  
    const blog = this.blogService.getPostById(this.blogId);
    console.log('Blog:', blog);
  
   
      this.blogForm.patchValue({
        title: blog.title,
        content: blog.content
      });
    
  }

  onSubmit(): void {
    const { title, content } = this.blogForm.value;

    if (this.blogService.updatePost(this.blogId, title, content)) {
      this.router.navigate(['/']);
    } else {
      alert('Failed to update the blog post. You may not be authorized to edit this post.');
    }
  }
}
