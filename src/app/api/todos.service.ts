import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { UserService } from './user.service';
import { catchError, throwError } from 'rxjs';

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private readonly _todos = signal<Todo[]>([]);
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
      .get<{ todos: Todo[] }>(`https://dummyjson.com/todos/user/${userId}`)
      .pipe(catchError(this._handleReqError.bind(this)))
      .subscribe((res) => {
        this._todos.set(res.todos);
        this._loading.set(false);
      });
  }

  public get todos() {
    return this._todos();
  }

  public get isLoading() {
    return this._loading();
  }
}
