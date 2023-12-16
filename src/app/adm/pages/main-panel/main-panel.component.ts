import { Component, inject } from '@angular/core';
import { AdmService } from '../../service/adm.service';
import { GymService } from 'src/app/gym/service/gym.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent {

  public panelSelected:number = 1;
  public admService = inject(AdmService);
  public gymService = inject(GymService);
  public authService = inject(AuthService);

  public baseUrl = environment.baseUrl;

  private router = inject(Router)

  public changeState(newState:number){
    if(newState < 1 || newState > 3){
      this.panelSelected = 1;
    }else{
      this.panelSelected = newState;
    }
  }

  public destroyMessage(){
    this.admService.isMessage = false;
  }

  public offWindow(){
    this.admService.abortDelete();
  }

  public executePostCallback(){
    const subscription = this.gymService.generatePostObservable(this.admService.urlCallback, this.admService.bodyCallback)
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        this.admService.setIsSuccess(false);
        this.admService.setIsMessage(true);
        subscription.unsubscribe();
      },
      next:(res) => {
        this.admService.setIsSuccess(true);
        this.admService.setIsMessage(true);
        subscription.unsubscribe();
        this.offWindow();
        window.location.reload();
      }
    })
  }

  public notPropagate(e:Event){
    e.stopPropagation();
  }

  public logout(){
    this.authService.logout();
  }

}
