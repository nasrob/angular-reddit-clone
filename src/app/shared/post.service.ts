import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
