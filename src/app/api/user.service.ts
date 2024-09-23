import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  image: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _userResponse = signal<User | null>(
    JSON.parse(localStorage.getItem('session') || '{}')
  );
  private readonly _loading = signal<boolean>(false);
  private readonly _shouldRedirect = signal({
    state: false,
    path: '/',
  });

  constructor(private _http: HttpClient) {}

  private _handleReqError(err: any) {
    this._loading.set(false);
    if (err.status === 401) {
      this.refreshToken();
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  public refreshToken() {
    this._loading.set(true);
    this._http
      .post<User>('https://dummyjson.com/auth/refresh', {
        refreshToken: this.user?.refreshToken,
        expiresInMins: 180,
      })
      .pipe(catchError(this._handleReqError.bind(this)))
      .subscribe((res) => {
        localStorage.setItem('session', JSON.stringify(res));
        this._userResponse.set(res);
        this._loading.set(false);
      });
  }

  public auth(_username: string, _password: string) {
    this._shouldRedirect.set({ state: false, path: '/' });
    this._loading.set(true);
    this._http
      .post<User>('https://dummyjson.com/user/login', {
        username: 'alexanderj',
        password: 'alexanderjpass',
      })
      .pipe(catchError(this._handleReqError.bind(this)))
      .subscribe((res) => {
        localStorage.setItem('session', JSON.stringify(res));
        this._userResponse.set(res);
        this._loading.set(false);
        this._shouldRedirect.set({ state: true, path: '/dashboard' });
      });
  }

  public register(username: string, password: string) {
    this._loading.set(true);
    this._http
      .post<User>('https://dummyjson.com/users/add', {
        username,
        password,
        age: 35,
      })
      .pipe(catchError(this._handleReqError.bind(this)))
      .subscribe((res) => {
        this._userResponse.set(res);
        this._loading.set(false);
      });
  }

  public clearSession() {
    this._shouldRedirect.set({ state: false, path: '/' });
    this._loading.set(false);
    this._userResponse.set(null);
    localStorage.removeItem('session');
    this._shouldRedirect.set({ state: true, path: '/login' });
  }

  get user() {
    return this._userResponse();
  }

  get isLoading() {
    return this._loading();
  }

  get shouldRedirect() {
    return this._shouldRedirect();
  }
}
