import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GymApp';

  private authService:AuthService ;
  private baseUrl = environment;


  constructor(authService: AuthService){
    this.authService = authService

  }

  ngOnInit(){
    console.log('App initialized');
  }



}
