import { Component, effect, signal } from '@angular/core';
import { CoreFacadeService } from '../../../facades/core-facade.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  isLoading = false;
  displayLogin = signal<boolean>(true);

  constructor(private _coreFacade: CoreFacadeService) {
    effect(() => {
      this.isLoading = this._coreFacade.loadingState;
    });
  }

  public login(formValues: { username: string; password: string }) {
    this._coreFacade.authUser(formValues.username, formValues.password);
  }

  public register(formValues: { username: string; password: string }) {
    this._coreFacade.registerUser(formValues.username, formValues.password);
  }
}
