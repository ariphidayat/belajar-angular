import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({ providedIn: 'root'})
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createPost(title: string, content: string) {
    const post: Post = {title: title, content: content};

    this.http
      .post(
        'https://arip-belajar-default-rtdb.firebaseio.com/posts.json',
        post
      )
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://arip-belajar-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        // transform data
        map(responseData => {
          const newData: Post[] = [];
          for(const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              newData.push({ ...responseData[key], id : key });
            }
          }
          return newData;
        }),
        // catch error
        catchError(errorResponse => {
          return throwError(errorResponse);
        })
      );
  }

  fetchPost(key: string) {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://arip-belajar-default-rtdb.firebaseio.com/posts.json',
        {
          // put headers or params here
          params: new HttpParams().set('orderBy', '"$key"').set('equalTo', '"' + key + '"')
        })
      .pipe(
        map(responseData => responseData[key])
      )
  }

  clearPosts() {
    return this.http.delete('https://arip-belajar-default-rtdb.firebaseio.com/posts.json');
  }
 }
