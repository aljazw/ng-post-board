export interface Comment {
  id?: number;
  postId: number;
  author: string;
  createdAt: Date;
  content: string;
}
