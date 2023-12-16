import { Component, OnInit, inject } from '@angular/core';
import { Customer } from '../../interfaces/customers.admin.interface';
import { GymService } from 'src/app/gym/service/gym.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { AdmService } from '../../service/adm.service';

@Component({
  selector: 'app-customers-panel',
  templateUrl: './customers-panel.component.html',
  styleUrls: ['./customers-panel.component.css']
})
export class CustomersPanelComponent implements OnInit {

  private gymService = inject(GymService);
  private admService = inject(AdmService);
  private baseUrl = environment.baseUrl;

  public customers: Customer[]= [];
  public currentCustomer?:Customer;

  public isWindowActive:boolean = false;
  public isBookingEdit:boolean = false;
  public isUserMembership:boolean = false;

  ngOnInit(){
    this.getCustomers();
  }


  public getCustomers(){
    const subscription = this.gymService.generatePostObservable<Customer[]>(`${this.baseUrl}/api/action/dispatch/getCustomers`)
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        subscription.unsubscribe();
      },
      next:(res:Customer[]) => {
        this.customers = res;
        subscription.unsubscribe();
      }
    })
  }

  public openEditCustomer(receivedCustomer:Customer){
    this.currentCustomer = receivedCustomer;
    this.isBookingEdit =  false;
    this.isUserMembership = false;
    this.isWindowActive = true;
  }

  public openDeleteCustomer(id:number){
    this.admService.setConfirmDelete(`${this.baseUrl}/api/action/dispatch/deleteCustomer/${id}`);
  }

  public offWindow(){
    this.isWindowActive = false;
    this.getCustomers();
  }

  public openBookings(receivedCustomer:Customer){
    this.currentCustomer = receivedCustomer;
    this.isWindowActive = false;
    this.isBookingEdit = true;
  }
  public closeBookings(){
    this.isBookingEdit = false;
    this.getCustomers()
  }
  public openUserMembership(receivedCustomer:Customer){
    this.currentCustomer = receivedCustomer;
    this.isWindowActive = false;
    this.isBookingEdit = false;
    this.isUserMembership = true;
  }
  public closeUserMembership(){
    this.isUserMembership = false;
    this.getCustomers()
  }

  public notPropagate(e:Event){
    e.stopPropagation();
  }
}
