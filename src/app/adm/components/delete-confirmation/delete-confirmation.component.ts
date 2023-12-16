import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {

  @Output() emitConfirmation = new EventEmitter<string>();
  @Output() cancelDelete = new EventEmitter<string>();

  constructor(){}

  public cancel(){
    this.cancelDelete.emit("cancel");
  }

  public confirm(){
    this.emitConfirmation.emit("confirm");
  }
}
