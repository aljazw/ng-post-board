import { Component, inject, OnInit, signal, Type,  } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Post } from '../../post.model';
import { PostService } from '../../../../core/services/post.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditPostDialog } from '../edit-post-dialog/edit-post-dialog';
import { DeletePostDialog } from '../delete-post-dialog/delete-post-dialog';
import { AddPostDialog } from '../add-post-dialog/add-post-dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize, forkJoin } from 'rxjs';
import { CommentListDialog } from '../../../comments/components/comment-list-dialog/comment-list-dialog';
import { SnackbarService } from '../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-post-list',
  imports: [
    MatSlideToggleModule, 
    MatPaginatorModule, 
    MatCardModule, 
    MatIconModule, 
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ], 
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList implements OnInit{

  readonly dialog = inject(MatDialog);
  readonly postService = inject(PostService)
  readonly snackbar = inject(SnackbarService);

  EditPostDialog = EditPostDialog;    
  DeletePostDialog = DeletePostDialog;
  AddPostDialog = AddPostDialog;
  CommentListDialog = CommentListDialog;

  posts: Post[]  = [];
  totalPosts = signal(0);             
  pageSize = 6;
  currentPage = 0;
  loading = signal(false);

  ngOnInit(): void {
    this.loadData();     
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  openPostDialog<T>(component: Type<T>, post?: Post) {
    const dialogRef = this.dialog.open(component, {
      data: { ...post }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== true) {
        this.loadData();
      }
    });
  }


  loadData() {
    const start = this.currentPage * this.pageSize;
    this.loading.set(true);

    forkJoin({
      posts: this.postService.getPosts({ start, limit: this.pageSize }),
      total: this.postService.countPosts()
    })
    .pipe(
      finalize(() => {
        this.loading.set(false);
      })
    )
    .subscribe({
      next: (result) => {
        this.posts = result.posts;
        this.totalPosts.set(result.total);
      },
      error: (err) => {
        this.snackbar.show(
          err.status === 0 ? "Server is not responding" : "Failed to load posts",
          'error'
        );
      }
    });
  }
  
}
