import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Instructor, SearchResponseInstructor } from 'src/app/gym/interfaces/instructor.interface';
import { GymService } from 'src/app/gym/service/gym.service';
import { environment } from 'src/environments/environment';
import { AdmService } from '../../service/adm.service';

@Component({
  selector: 'app-instructors-admin',
  templateUrl: './instructors-admin.component.html',
  styleUrls: ['./instructors-admin.component.css']
})
export class InstructorsAdminComponent {

  private gymService = inject(GymService);
  private admService=  inject(AdmService);
  private baseUrl = environment.baseUrl;

  public isEditInstructor:boolean = false;
  public isEditClasses:boolean = false;

  public instructors:Instructor[] = [];
  public currentInstructor?:Instructor;

  public isAdd:boolean = false;

  constructor(){
    this.getInstructors();
  }


  public getInstructors(){
    const subscription = this.gymService.generateGetObservable<SearchResponseInstructor>(`${this.baseUrl}/api/instructor`)
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        subscription.unsubscribe();
      },
      next:(res) => {
        subscription.unsubscribe();
        this.instructors =  res._embedded.instructor;
      }
    })
  }

  public openEditInstructor(instructorInput:Instructor){
    this.currentInstructor = instructorInput;
    this.isEditInstructor = true;
    this.isEditClasses = false;
    this.isAdd = false;
  }

  public closeEditInstructor(){
    this.isEditInstructor = false;
    this.getInstructors();
  }

  public openInstructorClasses(instructorInput:Instructor){
    this.currentInstructor = instructorInput;
    this.isEditInstructor = false;
    this.isEditClasses = true;
  }

  public closeInstructorClasses(){
    this.isEditClasses = false;
    this.getInstructors();
  }

  public openDeleteInstructor(id:number){
    this.admService.setConfirmDelete(`${this.baseUrl}/api/action/dispatch/deleteInstructor/${id}`);
  }

  public openAddInstructor(){
    this.isEditInstructor = true;
    this.isAdd = true;
    this.currentInstructor = undefined;
  }

  public notPropagate(e:Event){
    e.stopPropagation();
  }
}
