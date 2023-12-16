import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private authService = inject(AuthService);
  private viewPort = inject(ViewportScroller);

  ngOnInit(){
    this.viewPort.scrollToPosition([0,0]);
    if(this.authService.getIsAuthenticated){
      this.authService.pingToken();
    }
  }

}
