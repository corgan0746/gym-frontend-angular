import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Classes } from '../../interfaces/customers.admin.interface';
import { environment } from 'src/environments/environment';
import { GymService } from 'src/app/gym/service/gym.service';
import { AdmService } from '../../service/adm.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Instructor, SearchResponseInstructor } from 'src/app/gym/interfaces/instructor.interface';

@Component({
  selector: 'class-instructor-edit',
  templateUrl: './class-instructor-edit.component.html',
  styleUrls: ['../../shared-css/shared-css.component.css']
})
export class ClassInstructorEditComponent {

  @Output() closeEdit = new EventEmitter<string>();

  @Input()
  public classes?:Classes;

  public currentInstructor?:Instructor;
  public instructors:Instructor[] = [];

  private baseUrl:string = environment.baseUrl;
  private gymService = inject(GymService);
  private admService = inject(AdmService);

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.getAllInstructors();

    if(this.classes){
      const url:any = this.classes;
      this.getSingleInstructor(url?._links?.instructor?.href);
      this.updateForm.setValue({instructor:'',classes:this.classes.id})
    }
  }


  public updateForm: FormGroup = this.fb.group({
    instructor:['', [Validators.requiredTrue]],
    classes:['', [Validators.requiredTrue]],
  }
  )

  public getSingleInstructor(url:string){
    const subscription = this.gymService.generateGetObservable<Instructor>(url)
    .subscribe((res) => {
      this.currentInstructor = res;
      subscription.unsubscribe();
    })
  }

  public getAllInstructors(){
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

  public updateClassInstructor(){
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/assignClass`, this.updateForm.value)
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
        this.closeWindow();
      }
    })
  }

  public removeInstructor(id:number | undefined){
    if(id === undefined) return;
    this.updateForm.setValue({...this.updateForm.value, instructor: this.currentInstructor?.id});
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/removeInstructorClass`, this.updateForm.value)
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
        this.closeWindow();
      }
    })
  }

  public selectInstructor(target:any){
    this.updateForm.setValue({...this.updateForm.value, instructor: parseInt(target.value)});
  }

  public closeWindow(){
    this.closeEdit.emit("close");
  }


  public submit(){
    this.updateClassInstructor();
  }

}
