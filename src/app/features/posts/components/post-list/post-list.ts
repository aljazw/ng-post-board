import { Component, OnInit,  } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Post } from '../../post.model';
import { PostService } from '../../../../core/services/post.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-list',
  imports: [
    MatSlideToggleModule, 
    MatPaginator, 
    MatCardModule, 
    MatIconModule, 
    CommonModule,
    MatButtonModule
  ], 
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList implements OnInit{
  posts: Post[] = [];
  pagedPosts: Post[] = [];

  pageSize = 6;
  currentPage = 0;

  constructor (private postService: PostService) {}
  
  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.updatePagedPosts();
  }


  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedPosts();
  }

  updatePagedPosts() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedPosts = this.posts.slice(start, end);
  }


}
