import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Comment } from '../../features/comments/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  private readonly  baseUrl = 'http://localhost:3000/comments';
  private readonly http = inject(HttpClient);

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}?postId=${postId}`).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.baseUrl, comment).pipe(
      catchError(err => {
        return throwError(() => err);
      })
    );
  }


  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(err => {
        return throwError(() => err); 
      })
    );
  }
  
}
