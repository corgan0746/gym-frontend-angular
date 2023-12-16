import { Component, Input, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
  imports:[
    RouterModule
  ],
  standalone:true
})
export class SideMenuComponent {

  private authService = inject(AuthService);

  public logout(){
    this.authService.logout();
  }

}
