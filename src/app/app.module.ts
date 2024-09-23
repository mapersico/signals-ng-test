import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CoreFacadeService } from './facades/core-facade.service';
import { UserService } from './api/user.service';
import { provideHttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    UserService,
    CoreFacadeService,
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
