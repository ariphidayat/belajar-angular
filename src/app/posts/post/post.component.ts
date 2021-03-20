import { PostService } from './../../posts.service';
import { Post } from './../../post.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
  post: Post = { title: '', content: ''}

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    const key = this.route.snapshot.params['id'];
    this.postService.fetchPost(key)
      .subscribe(post => this.post = post);
  }
}
