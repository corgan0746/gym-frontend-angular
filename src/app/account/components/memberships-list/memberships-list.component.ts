import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Class } from 'src/app/gym/interfaces/class.interface';
import { Membership } from 'src/app/gym/interfaces/membership.interface';
import { ResponseMembership } from '../../interfaces/membership-account.interface';
import { AccountService } from '../../service/account.service';
import { Customer, UserMembership } from '../../interfaces/customer.interface';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-memberships-list',
  templateUrl: './memberships-list.component.html',
  styleUrls: ['./memberships-list.component.css']
})
export class MembershipsListComponent {



  private accountService = inject(AccountService);
  private router = inject(Router);

  public membership?:Membership;
  private customer?:Customer;
  public classes:Class[] = [];
  public isRenew:boolean = false;
  public isPaid:boolean = false;
  public isActive:boolean = false;
  public date?:Date;
  private baseUrl = environment.baseUrl;

  constructor(){
    this.getCustomer();
  }


  public getClasses(id:number){
    const subscription = this.accountService.generateGetObservable<ResponseMembership>(`${this.baseUrl}/api/getClassesFromMembership/${id}`)
    .subscribe({
      next:(res:ResponseMembership) => {
        this.classes = res.classes;
        subscription.unsubscribe();
      },
      error:(err) => {
        subscription.unsubscribe();
      }
    })
  }

  public getCustomer(){
    const subscription = this.accountService.getCustomerWithTokenAndMembership()
    .subscribe({
      next:(res:Customer|null) => {
        if(res === null) return;
        this.customer = res;
        if(this.customer?.userMembership.membership){
        this.membership = this.customer?.userMembership.membership;
        this.isRenew = this.customer.userMembership.active;
        this.isPaid = this.customer.userMembership.paid;
        this.isActive = this.customer.userMembership.active;

        this.date = new Date(this.customer.userMembership.endDate * 1000);
        subscription.unsubscribe();
          this.getClasses(this.membership.id);
        }
      },
      error:(err) => {
        subscription.unsubscribe();
      }
    })
  }


}
