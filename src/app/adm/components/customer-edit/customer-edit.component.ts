import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Customer } from '../../interfaces/customers.admin.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { GymService } from 'src/app/gym/service/gym.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AdmService } from '../../service/adm.service';

@Component({
  selector: 'customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['../../shared-css/shared-css.component.css']
})
export class CustomerEditComponent implements OnInit {

  @Output() closeEdit = new EventEmitter<string>();

  @Input()
  public customer?:Customer;

  private baseUrl:string = environment.baseUrl;
  private gymService = inject(GymService);
  private admService = inject(AdmService);

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    if(this.customer !== undefined){
      const {firstName, lastName, active, phone, email, id} = this.customer;
      this.updateForm.setValue({firstName, lastName, active, phone, email, id});
    }
  }

  public updateForm: FormGroup = this.fb.group({
    id:[''],
    email:['', [Validators.required]],
    firstName:['', [Validators.required]],
    lastName:['', [Validators.required]],
    phone:['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(11), Validators.minLength(11)]],
    active:[true, [Validators.requiredTrue]]
  }
  )

  public updateCustomer(){
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/updateCustomer`, this.updateForm.value)
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

  public closeWindow(){
    this.closeEdit.emit("close");
  }


  public submit(){
    this.updateCustomer();

  }

  public notPropagate(e:Event){
    e.stopPropagation();
  }

}
