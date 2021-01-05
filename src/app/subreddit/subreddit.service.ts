import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubredditModel } from './subreddit-response';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  apiUrl: string = 'http://localhost:8080/api/subreddit';

  constructor(private http: HttpClient) { }

  getAllSubreddits(): Observable<SubredditModel[]> {
    return this.http.get<SubredditModel[]>(this.apiUrl);
  }

  createSubreddit(subbredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post<SubredditModel>(this.apiUrl, subbredditModel);
  }
}
