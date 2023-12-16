import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private authService = inject(AuthService)
  private fb = inject(FormBuilder);

  public loginAttempt:boolean = false;

  public myForm: FormGroup = this.fb.group({
    email:['ssssssssd@hotmail.com', [Validators.required]],
    password:['Nonobo7!', [Validators.required]],
  })

  public get isError(){
    return this.authService.getIsAuthError();
  }

  public get errorMessage(){
    return this.authService.getErrorMessage;
  }

  public submit(e:any){
    this.loginAttempt = true;
    const {email, password} = this.myForm.value;
    let res =  this.authService.authenticateFirebase({email, password})

  }

  public actualSendToken(){
    this.authService.actualAuthenticate();
  }

  public getProducts(){
    this.authService.getProducts();
  }


}


