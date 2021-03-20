import { PostService } from '../posts.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './posts.component.html'
})
export class PostsComponent {

  constructor(private http: HttpClient, private postService: PostService) { }

  onCreatePosts(postData: {title: string, content: string}) {
    this.postService.createPost(postData.title, postData.content);
  }
}
