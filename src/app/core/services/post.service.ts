import { Injectable } from '@angular/core';
import { Post } from '../../features/posts/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];

  constructor() {
    for (let i = 1; i <=50; i++) {
      this.posts.push({
        id: i,
        title: `Post Title ${i}`,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus...',
        author: `User ${i % 5 + 1}`,
        createdAt: new Date(2025, 10, 20)
      });
    }
  }

  getPosts(): Post[] {
     return this.posts;
  }


}
