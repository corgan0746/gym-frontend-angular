import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Classes } from 'src/app/account/interfaces/customer.interface';
import { SearchResponse } from 'src/app/gym/interfaces/class.interface';
import { GymService } from 'src/app/gym/service/gym.service';
import { AdmService } from '../../service/adm.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-classes-admin',
  templateUrl: './classes-admin.component.html',
  styleUrls: ['./classes-admin.component.css']
})
export class ClassesAdminComponent {

  private gymService = inject(GymService);
  private admService = inject(AdmService);

  public currentClass?:Classes;
  public classes:Classes[] = [];

  public isWindowActive:boolean = false;
  public isEditClass:boolean = false;
  public isEditTimeslot:boolean = false;

  public isAdd:boolean = false;

  public baseUrl = environment.baseUrl;

  ngOnInit(){
    this.getClasses("");
  }


  public getClasses(mode:string){
    const subscription = this.gymService.getAllClasses(mode)
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        subscription.unsubscribe();
      },
      next:(res:SearchResponse) => {
        this.classes =  res._embedded.classes;
        subscription.unsubscribe();
      }
    })
  }

  public openInstructors(singleClass:Classes){
    this.currentClass = singleClass;
    this.isWindowActive = true;
  }

  public offWindow(){
    this.isWindowActive = false;
    this.getClasses("");
  }

  public openEditClass(receivedClass:Classes){
    this.currentClass =  receivedClass;
    this.isEditClass = true;
    this.isWindowActive = false;
    this.isAdd = false;
  }

  public closeEditClass(){
    this.isEditClass = false;
    this.getClasses("");
  }

  public openAddClass(){
    this.isEditClass = true;
    this.isWindowActive = false;
    this.isAdd = true;
    this.currentClass = undefined;
  }

  public openTimeslots(receivedClass:Classes){
    this.currentClass =  receivedClass;
    this.isEditClass = false;
    this.isWindowActive = false;
    this.isEditTimeslot = true;
  }

  public closeEditTimeslot(){
    this.isEditTimeslot = false;
    this.getClasses("");
  }

  public openDeleteClass(id:number){
    this.admService.setConfirmDelete(`${this.baseUrl}/api/action/dispatch/deleteClass/${id}`);
  }

  public notPropagate(e:Event){
    e.stopPropagation();
  }
}
