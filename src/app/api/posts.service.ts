import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { UserService } from './user.service';
import { catchError, throwError } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly _posts = signal<Post[]>([]);
  private readonly _loading = signal<boolean>(false);

  constructor(private _http: HttpClient, private _userService: UserService) {}

  private _handleReqError(err: any) {
    this._loading.set(false);
    if (err.status === 401) {
      this._userService.refreshToken();
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  public getAll(userId: number) {
    this._loading.set(true);
    this._http
      .get<{ posts: Post[] }>(`https://dummyjson.com/users/${userId}/posts`)
      .pipe(catchError(this._handleReqError.bind(this)))
      .subscribe((res) => {
        this._posts.set(res.posts);
        this._loading.set(false);
      });
  }

  public get posts() {
    return this._posts();
  }

  public get isLoading() {
    return this._loading();
  }
}
