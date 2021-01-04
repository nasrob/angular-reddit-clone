import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/post.model';
import { PostService } from '../shared/post.service';
import { faArrowUp, faArrowDown, faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faArrowUp = faArrowUp;
  faArroDown = faArrowDown;
  faComments = faComments;

  posts$: Array<Post> = [];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe((posts: Post[]) => this.posts$ = posts)
  }

  ngOnInit(): void {
  }


}
