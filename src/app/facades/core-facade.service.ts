import { effect, Injectable } from '@angular/core';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
import { PostsService } from '../api/posts.service';
import { TodosService } from '../api/todos.service';

@Injectable({
  providedIn: 'root',
})
export class CoreFacadeService {
  constructor(
    private _postsService: PostsService,
    private _userService: UserService,
    private _todosService: TodosService,
    private _router: Router
  ) {
    effect(() => {
      if (this._userService.shouldRedirect.state) {
        this._router.navigate([this._userService.shouldRedirect.path]);
      }
    });
  }

  public get loadingState() {
    return this._userService.isLoading || this._postsService.isLoading;
  }

  public get userData() {
    return this._userService.user;
  }

  public get postsData() {
    return this._postsService.posts;
  }

  public get todosData() {
    return this._todosService.todos;
  }

  public authUser(username: string, password: string) {
    this._userService.auth(username, password);
    this._router.navigate(['/']);
  }

  public registerUser(username: string, password: string) {
    this._userService.register(username, password);
  }

  public logoutUser() {
    this._userService.clearSession();
  }

  public getAllPosts() {
    this._postsService.getAll(this._userService.user?.id || 0);
  }

  public getAllTodos() {
    this._todosService.getAll(this._userService.user?.id || 0);
  }
}
