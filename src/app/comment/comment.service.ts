import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from './comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl: string = 'http://localhost:8080/api';

  constructor(private httplClient: HttpClient) { }

  getAllCommentsForPosts(postId: number): Observable<CommentPayload[]> {
    return this.httplClient.get<CommentPayload[]>(this.apiUrl + '/comments/by-post/' + postId);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httplClient.post<any>(this.apiUrl + '/comments/', commentPayload);
  }

  getAllCommentsByUser(name: string) {
    return this.httplClient.get<CommentPayload[]>(this.apiUrl + '/comments/by-user/' + name);
  }
}
