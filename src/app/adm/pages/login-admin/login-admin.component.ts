import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {

  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);
  public wrongDetails:boolean = false;
  private baseUrl = environment.baseUrl;


  constructor(){
    this.router.navigateByUrl("/adm/panel");
  }

  mainPanelLogin(e:any){
    e.preventDefault();
    this.wrongDetails = false;
    const username = e.target[0].value;
    const password = e.target[1].value;
    if((username === "") || (password === "")){
      return;
    }

    const token = this.authService.getFromLocalStorage();

    if(token === null){
      this.router.navigateByUrl("/login")
    }
    const stringToken:string = token!.toString();
    const subscription = this.http.post(`${this.baseUrl}/api/loginAdmin`,{
      username, password
    }, {
      headers:{["Authorization"]: stringToken}
    })
    .subscribe({
      error:(err:HttpErrorResponse) => {
        this.wrongDetails = true;
        subscription.unsubscribe();
      },
      next:(res:any)=>{
        subscription.unsubscribe();
        this.router.navigateByUrl("/adm/panel");
      }
    }

    )

  }

}
