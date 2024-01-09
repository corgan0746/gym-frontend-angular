import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login/login-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopAuthComponent } from './components/top-auth/top-auth.component';
import { LoaderComponent } from '../share/components/loader/loader.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterComponent,
    LoginPageComponent,
    TopAuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    LoaderComponent
  ]
})
export class AuthModule { }
