import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  faComments = faComments;

  posts$: Array<Post> = [];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe((posts: Post[]) => this.posts$ = posts)
  }

  ngOnInit(): void {
  }

}
