import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { AccountService } from '../../service/account.service';
import { Customer } from '../../interfaces/customer.interface';
import { ViewportScroller } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './main-account.component.html',
  styleUrls: ['./main-account.component.css']
})
export class MainAccountComponent implements OnInit {

  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  public customer?:Customer;

  private viewPort = inject(ViewportScroller);

  ngOnInit(){
    this.viewPort.scrollToPosition([0,0]);
    this.authService.pingToken();
  }


  public get getName(){
    return this.authService.getUser()?.firstName;
  }

  public logout(){
    this.authService.logout();
  }

  public getCustomer(){
    const subscription = this.accountService.getCustomerWithToken()
    .subscribe({
      next:(res) => {
        if(res === null) return;
        this.customer = res;
        subscription.unsubscribe();
      },
      error:(err) => {
        subscription.unsubscribe();
      }
    })
  }

}
