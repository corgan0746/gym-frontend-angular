import { Component, inject } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Booking, Customer } from '../../interfaces/customer.interface';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {


  private accountService = inject(AccountService);

  public bookings:Booking[]=[];

  constructor(){
    this.getCustomer();
  }


  public getCustomer(){
    const subscription = this.accountService.getCustomerWithTokenAndBookings()
    .subscribe({
      next:(res:Customer|null) => {
        if(res === null) return;
        this.bookings = res.bookings;
        subscription.unsubscribe();
      },
      error:(err) => {
        subscription.unsubscribe();
      }
    })
  }


}
