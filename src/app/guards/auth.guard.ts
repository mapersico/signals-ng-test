import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CoreFacadeService } from '../facades/core-facade.service';
import { User } from '../api/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _coreFacade: CoreFacadeService,
    private _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    const currentUser = this._coreFacade.userData;

    if (!currentUser?.accessToken) {
      return this._router.navigate(['/login']);
    }

    if (currentUser) return true;
    return false;
  }
}
