import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Comment } from '../../comment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-item',
  imports: [MatIconModule, CommonModule],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.css',
})
export class CommentItem {

  @Input() comment!: Comment;

}
