import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Customer } from '../interfaces/customer.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private currentCustomer?:Customer;
  private baseUrl = environment.baseUrl;

  constructor() {
    this.getCustomerWithToken();
  }

  public get getCustomer(){
    return this.currentCustomer;
  }

  public set setCustomer(customer:Customer){
    this.currentCustomer = customer;
  }


  public getCustomerWithToken():Observable<Customer|null>{
    const token = this.authService.getFromLocalStorage();
    if(!token){
      console.log("No token")
      return new Observable<null>;
    }

    return this.http.post<Customer>(`${this.baseUrl}/api/getCustomerByToken`,null,
        {
          headers:{["Authorization"]: token }
        }
    )
  }

  public getCustomerWithTokenAndBookings():Observable<Customer|null>{
    const token = this.authService.getFromLocalStorage();
    if(!token){
      console.log("No token")
      return new Observable<null>;
    }

    return this.http.post<Customer>(`${this.baseUrl}/api/getCustomerWithBookings`,null,
        {
          headers:{["Authorization"]: token }
        }
    )
  }

  public getCustomerWithTokenAndMembership():Observable<Customer|null>{
    const token = this.authService.getFromLocalStorage();
    if(!token){
      console.log("No token")
      return new Observable<null>;
    }

    return this.http.post<Customer>(`${this.baseUrl}/api/getCustomerWithMembership`,null,
        {
          headers:{["Authorization"]: token }
        }
    )
  }
  public generateGetObservable<T>(url:string):Observable<T>{
    return this.http.get<T>(url);
  }
}
