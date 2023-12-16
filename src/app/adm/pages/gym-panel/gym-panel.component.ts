import { Component } from '@angular/core';

@Component({
  selector: 'app-gym-panel',
  templateUrl: './gym-panel.component.html',
  styleUrls: ['./gym-panel.component.css']
})
export class GymPanelComponent {

  public gymRoute:number = 1;

  public changeState(newState:number){
    if(newState < 1 || newState > 3){
      this.gymRoute = 1;
    }else{
      this.gymRoute = newState;
    }
  }

}
