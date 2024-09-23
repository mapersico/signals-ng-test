import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  onLogin = output<{ username: string; password: string }>();
  onFormChange = output();
  username = signal<string>('');
  password = signal<string>('');
  displaySignalsValues = signal<boolean>(false);

  login() {
    this.onLogin.emit({ username: this.username(), password: this.password() });
  }
}
