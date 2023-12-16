import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Instructor } from 'src/app/gym/interfaces/instructor.interface';
import { GymService } from 'src/app/gym/service/gym.service';
import { environment } from 'src/environments/environment';
import { AdmService } from '../../service/adm.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classes } from '../../interfaces/customers.admin.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'instructor-classes-edit',
  templateUrl: './instructor-classes-edit.component.html',
  styleUrls: ['../../shared-css/shared-css.component.css']
})
export class InstructorClassesEditComponent {

  @Output() closeEdit = new EventEmitter<string>();

  @Input()
  public instructor?:Instructor;

  private baseUrl:string = environment.baseUrl;
  private gymService = inject(GymService);
  private admService = inject(AdmService);

  private fb = inject(FormBuilder);

  public selectedClass?:Classes;
  public classes:Classes[] = [];
  public instructorClasses:Classes[] = [];

  ngOnInit(): void {
    if(this.instructor !== undefined){
      const {id} = this.instructor;
      this.updateForm.setValue({classes:'', instructor:id});
      this.getInstructorClasses(this.instructor._links.classes.href);
      this.getAllClasses();
    }
  }



  public updateForm: FormGroup = this.fb.group({
    classes:[''],
    instructor:['', [Validators.required]],
  }
  )

  public addClass(){
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/assignClass`, this.updateForm.value)
    .subscribe({
      error:()=> {
        this.admService.setIsSuccess(false);
        this.admService.setIsMessage(true);
        subscription.unsubscribe();
      },
      next:() => {
        this.admService.setIsSuccess(true);
        this.admService.setIsMessage(true);
        subscription.unsubscribe();
        this.closeWindow();
      }
    })
  }

  public removeInstructorClass(id:number | undefined){
    if(id === undefined) return;
    this.updateForm.setValue({...this.updateForm.value, classes:id})
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

  public getAllClasses(){
    const subscription = this.gymService.generateGetObservable(`${this.baseUrl}/api/classes`)
    .subscribe((res:any) => {
      this.classes = res?._embedded.classes;
      subscription.unsubscribe();    })
  }

  public getInstructorClasses(url:string){
    const subscription = this.gymService.generateGetObservable(url)
    .subscribe((res:any)=> {
      this.instructorClasses = res?._embedded?.classes;
      subscription.unsubscribe();
    })
  }

  public selectClass(target:any){
    this.selectedClass = this.classes[target.value];
    this.updateForm.setValue({...this.updateForm.value, classes: this.selectedClass.id})
  }

  public closeWindow(){
    this.closeEdit.emit("close");
  }


  public submit(){
    this.addClass();

  }
}
