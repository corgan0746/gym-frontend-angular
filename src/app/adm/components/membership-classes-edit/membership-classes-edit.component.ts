import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ResponseMembership } from '../../interfaces/membership.admin.interface';
import { environment } from 'src/environments/environment';
import { GymService } from 'src/app/gym/service/gym.service';
import { AdmService } from '../../service/adm.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classes } from '../../interfaces/customers.admin.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'membership-classes-edit',
  templateUrl: './membership-classes-edit.component.html',
  styleUrls: ['../../shared-css/shared-css.component.css']
})
export class MembershipClassesEditComponent {

  @Output() closeEdit = new EventEmitter<string>();

  @Input()
  public membership?:ResponseMembership;

  private baseUrl:string = environment.baseUrl;
  private gymService = inject(GymService);
  private admService = inject(AdmService);

  private fb = inject(FormBuilder);

  public selectedClass?:Classes;
  public classes:Classes[] = [];
  public membershipClasses:Classes[] = [];

  ngOnInit(): void {
    if(this.membership !== undefined){
      const { id } = this.membership;
      this.updateForm.setValue({classes:'', membership:id});
      this.membershipClasses = this.membership.classes;
      this.getAllClasses();
    }
  }



  public updateForm: FormGroup = this.fb.group({
    classes:['', [Validators.required]],
    membership:['', [Validators.required]],
  }
  )

  public addClass(){
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/addClassToMembership`, this.updateForm.value)
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

  public removeMembershipClass(id:number | undefined){
    if(id === undefined) return;
    this.updateForm.setValue({...this.updateForm.value, classes:id})
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/removeClassFromMembership`, this.updateForm.value)
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
