import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/Blog Service/blogservice.service';
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
  
    this.blogService.getPostById(this.blogId).then(blog => {
      if (blog) {
        this.blogForm.patchValue({
          title: blog.title,
          content: blog.content
        });
      } else {
        console.error('Blog post not found');
        this.router.navigate(['/']);
      }
    }).catch(error => {
      console.error('Error fetching the blog post', error);
    });
  }
  async onSubmit(): Promise<void> {
    const { title, content } = this.blogForm.value;
    
    // Make sure to pass the author as well
    const isUpdated = await this.blogService.updatePost(this.blogId, title, content);
    
    if (isUpdated) {
      // Redirect to the home page if the update is successful
      this.router.navigate(['/']);
    } else {
      // Handle update failure
      alert('Failed to update the blog post. You may not be authorized to edit this post.');
    }
  }
}
