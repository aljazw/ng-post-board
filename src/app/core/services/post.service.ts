import { inject, Injectable } from '@angular/core';
import { Post } from '../../features/posts/post.model';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly baseUrl = `${environment.apiUrl}/posts`;
  private readonly http = inject(HttpClient);

  getPosts(params?: { start?: number; limit?: number }): Observable<Post[]> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.start !== undefined) {
        httpParams = httpParams.set('_start', params.start.toString());
      }
      if (params.limit !== undefined) {
        httpParams = httpParams.set('_limit', params.limit.toString());
      }
    }

    return this.http.get<Post[]>(this.baseUrl, { params: httpParams });
  }

  countPosts(): Observable<number> {
    // JSON Server version 0.17.3 returns total count in X-Total-Count header if _limit is set
    const params = new HttpParams().set('_limit', '0');
    return this.http.get<Post[]>(this.baseUrl, { params, observe: 'response' }).pipe(
      map((response: HttpResponse<Post[]>) => {
        const totalCount = response.headers.get('X-Total-Count');
        return totalCount ? parseInt(totalCount, 10) : 0;
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post).pipe(
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${id}`, post).pipe(
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }
}
