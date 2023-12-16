import { Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './management-buttons.component.html',
  styleUrls: ['./management-buttons.component.css']
})
export class ManagementButtonsComponent {

  @Output() openEdit = new EventEmitter<string>();

  @Output() triggerDelete = new EventEmitter<string>();

  triggerEdit() {
    this.openEdit.emit("edit");
  }

  deleteAction() {
    this.triggerDelete.emit("delete")
  }
}
