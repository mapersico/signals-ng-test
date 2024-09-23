import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  onFormChange = output();
  onRegister = output<{ username: string; password: string }>();
  username = signal<string>('');
  password = signal<string>('');
  displaySignalsValues = signal<boolean>(false);

  register() {
    this.onRegister.emit({
      username: this.username(),
      password: this.password(),
    });
  }
}
