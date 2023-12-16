import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'admin-side-menu',
  templateUrl: './admin-side-menu.component.html',
  styleUrls: ['./admin-side-menu.component.css']
})
export class AdminSideMenuComponent {

  @Output() logoutSignal = new EventEmitter<string>();

  public logout(){
    this.logoutSignal.emit("s");
  }

}
