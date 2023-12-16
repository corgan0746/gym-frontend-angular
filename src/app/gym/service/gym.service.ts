import { Injectable, inject } from '@angular/core';
import { Class, SearchResponse } from '../interfaces/class.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GymService {

  private http:HttpClient = inject(HttpClient);
  private authService = inject(AuthService);
  private router = inject(Router)

  private baseUrl = environment.baseUrl;

  public bookingError:string = "";
  public bookingSuccess:string = "";


  constructor() {
    this.getAllClasses();
    this.getSingleClass(1);
  }

  private classes:Class[] = [];

  public getAllClasses(mode:string = ""):Observable<SearchResponse>{
    if(mode !== ""){
      mode = `classes/search/findAllBy${mode}`;
    }else{
      mode = `classes`
    }
    return this.http.get<SearchResponse>(`${this.baseUrl}/api/${mode}`)
  }

  public getSingleClass( id:number ){
    return this.http.get<Class>(`${this.baseUrl}/api/classes/${id}`);
  }

  public searchClasses(query:string, mode:string):Observable<SearchResponse>{
    return this.http.get<SearchResponse>(`${this.baseUrl}/api/classes/search/findAllByNameLike${mode}?name=%25${query}%25`)
  }

  public generateGetObservable<T>(url:string):Observable<T> {
    return this.http.get<T>(url);
  }

  public generatePostObservable<T>(url:string, body:any = null):Observable<T> {

    const token = this.authService.getFromLocalStorage();

    if(token === null){
      this.router.navigateByUrl("/login")
    }
    const stringToken:string = token!.toString();
    return this.http.post<T>( url ,body , {
      headers:{["Authorization"]: stringToken}
    })
  }


  public bookClass(code:string, slotId:number){

    const token = this.authService.getFromLocalStorage();

    if(token === null){
      this.router.navigateByUrl("/login")
    }
    const stringToken:string = token!.toString();

    const subsription = this.http.post(`${this.baseUrl}/api/buyOnce`,{
      code,
      slotId
    }, {
      headers:{["Authorization"]: stringToken}
    })
    .subscribe({
      error:(err:HttpErrorResponse) => {
        this.bookingError = err.error;
        subsription.unsubscribe();
      },
      next:(res:any)=>{
        if(res?.url === "membership-value"){
          this.bookingSuccess = "Class booked!";
          return;
        }
        window.location.assign(res?.url);
        subsription.unsubscribe();
      }
    }

    )
  }

  public buyMembership(code:string){

    const token = this.authService.getFromLocalStorage();
    if(token === null){
      this.router.navigateByUrl("/login")
    }
    const stringToken:string = token!.toString();

    const subsription = this.http.post(`${this.baseUrl}/api/buyMembership`,{
      code: code
    }, {
      headers:{["Authorization"]: stringToken}
    })
    .subscribe({
      error:(err:HttpErrorResponse) => {
        subsription.unsubscribe();
      },
      next:(res:any)=>{
        window.location.assign(res?.url);
        subsription.unsubscribe();
      }
    }
    )
  }

  public get currentClasses(){
    return this.classes;
  }




}
