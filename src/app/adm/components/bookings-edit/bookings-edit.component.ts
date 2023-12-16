import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { Booking, Customer, Membership, UserMembership } from '../../interfaces/customers.admin.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { GymService } from 'src/app/gym/service/gym.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AdmService } from '../../service/adm.service';

@Component({
  selector: 'bookings-edit',
  templateUrl: './bookings-edit.component.html',
  styleUrls: ['../../shared-css/shared-css.component.css']
})
export class BookingsEditComponent {

  @Output() closeEdit = new EventEmitter<string>();

  @Input()
  public customer?:Customer;

  @ViewChild('selectedElement') selectedIndex:any;

  private baseUrl:string = environment.baseUrl;
  private gymService = inject(GymService);
  private admService = inject(AdmService);

  private fb = inject(FormBuilder);

  public selectedBooking?:Booking;
  public bookings:Booking[] = [];

  ngOnInit(): void {
    if(this.customer !== undefined){
      this.bookings = this.customer.bookings;
    }
  }

  public updateForm: FormGroup = this.fb.group({
    id:[''],
    className:['', [Validators.required]],
    value:['', [Validators.required]],
    paid:[true, [Validators.required]],
    active:[true, [Validators.requiredTrue]]
  }
  )

  public updateBooking(){
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/updateBooking`, this.updateForm.value)
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

  public deleteBooking(id:number | undefined){
    if(id === undefined) return;
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/deleteBooking/${id}`)
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

  public selectBooking(target:any){
    this.selectedBooking = this.bookings[target.value];
    const {id, value, dateCreated, active, paid, classes} = this.selectedBooking;
    this.updateForm.setValue({id, value, active, paid, className:classes.name})
  }

  public closeWindow(){
    this.closeEdit.emit("close");
  }


  public submit(){
    this.updateBooking();
  }
}
