import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiUrl: string = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl + '/posts/');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, postPayload);
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${postId}`);
  }

  getAllPostsByUser(username: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl + '/posts/by-user/' + username);
  }
}
