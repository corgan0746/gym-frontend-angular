import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { Customer, Membership, UserMembership } from '../../interfaces/customers.admin.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { GymService } from 'src/app/gym/service/gym.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AdmService } from '../../service/adm.service';
import { SearchResponseMembership } from 'src/app/gym/interfaces/membership.interface';

@Component({
  selector: 'user-membership-edit',
  templateUrl: './user-membership-edit.component.html',
  styleUrls: ['../../shared-css/shared-css.component.css']
})
export class UserMembershipEditComponent {

  @Output() closeEdit = new EventEmitter<string>();

  @Input()
  public customer?:Customer;

  @ViewChild('selectedElement') selectedIndex?:ElementRef;

  private baseUrl:string = environment.baseUrl;
  private gymService = inject(GymService);
  private admService = inject(AdmService);

  private fb = inject(FormBuilder);

  public userMembership?: UserMembership;
  public memberships:Membership[] = [];

  ngOnInit(): void {
    if(this.customer !== undefined){
      this.userMembership = (this.customer.userMembership)? this.customer.userMembership : undefined;
      const subscription = this.gymService.generateGetObservable<SearchResponseMembership>(`${this.baseUrl}/api/membership`)
      .subscribe((res:SearchResponseMembership) => {
        this.memberships = res._embedded.membership;
        subscription.unsubscribe();
      })
      if(this.userMembership !== undefined){

        const {id, reference, endDate, paid, renew, active, membership } = this.userMembership;
        this.updateForm.setValue({id, reference, endDate, paid, active, renew, membership:membership?.id || '' })

      }
    }
  }


  public updateForm: FormGroup = this.fb.group({
    id:['', [Validators.required]],
    endDate:['', [Validators.required]],
    paid:[true, [Validators.required]],
    active:[true, [Validators.requiredTrue]],
    renew:[true, [Validators.requiredTrue]],
    membership:[0, [Validators.requiredTrue]],
    reference:[true, [Validators.requiredTrue]],
  }
  )

  public updateUserMembership(){
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/updateUsermembership`, this.updateForm.value)
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

  public deleteMembership(id:number | undefined){
    if(id === undefined) return;
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/resetUsermembership/${id}`)
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

  public selectMembership(target:any){
    this.updateForm.setValue({...this.updateForm.value, membership: parseInt(target.value)});
  }

  public closeWindow(){
    this.closeEdit.emit("close");
  }


  public submit(){
    this.updateUserMembership();
  }
}
