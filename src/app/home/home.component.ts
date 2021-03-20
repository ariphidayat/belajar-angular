import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private errorSub: Subscription;
  isLoading = false;
  loadedPosts: Post[] = [];
  error = null;

  constructor(private http: HttpClient, private postService: PostService) { }

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })

    this.isLoading = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isLoading = false;
      this.loadedPosts = posts;
    }, error => {
      this.isLoading = false;
      this.error = error.message;
    })
  }

  onClearPosts() {
    this.postService.clearPosts().subscribe(() => {
      this.loadedPosts = [];
    })
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
