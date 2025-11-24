import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostList } from "./features/posts/components/post-list/post-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ng-post-board');
}
