import { Component, OnInit } from '@angular/core';
import { SubredditModel } from 'src/app/subreddit/subreddit-response';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  subreddits: SubredditModel[];
  displayViewAll: boolean;

  faArrowUp = faArrowUp;
  faArroDown = faArrowDown;

  constructor(private subredditService: SubredditService) {
    this.subredditService.getAllSubreddits().subscribe(data => {
      if (data.length >= 4) {
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    })
  }

  ngOnInit(): void {
  }

}
