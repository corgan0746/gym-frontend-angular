import { Injectable, computed, inject, signal } from '@angular/core';
import { CustomerReference, LoginError, User, UserCred, UserRegister, UserResponse } from '../interfaces/User';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subscription, catchError, from, interval, of, switchMap, tap, timer } from 'rxjs';
import { FirebaseError, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated:boolean = false;
  private http:HttpClient = inject(HttpClient)
  private router = inject(Router);
  private firebase = initializeApp(environment.firebase);
  private auth = getAuth(this.firebase);
  private accessToken:string | null = null;
  private baseUrl = environment.baseUrl;
  public profilePicture?:string;

  private currentError:LoginError;
  private user = signal<User | null>(null);
  private isAuthError = signal<boolean>(false);

  public getIsAuthError = computed(() => this.isAuthError() )
  public getUser = computed(() => this.user());

  private authSubscription?:Subscription;

  constructor() {
    this.currentError = {
      code:"",
      message:""
    };

    let checkUser = this.getFromLocalStorage();

    if( checkUser === null) return;
    this.getUserRelated(checkUser)

  }

  public get getToken(): string | null {
    return this.accessToken;
  }

  public get getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  private deleteCurrentError(){
    this.currentError = {
      code:"",
      message:""
    }
  }

  public getFromLocalStorage(): string | null{
    const token = sessionStorage.getItem("token");
    if(token === null) return null;
    return JSON.parse(token)

  }

  public saveToLocalStorage(stringToken:String){
    sessionStorage.setItem("token" , JSON.stringify(stringToken));
  }

  public registerUser(userData: UserRegister){

    const subscription = this.http.post(`${this.baseUrl}/api/register`,userData)
    .subscribe({
      error:(err:HttpErrorResponse) => {
        this.isAuthError.set(true);
        this.currentError.code = err.error;
        this.currentError.message = err.status.toString();
        subscription.unsubscribe();
      },
      next:(res)=>{
        this.isAuthError.set(false);
        this.deleteCurrentError();
        subscription.unsubscribe();
        this.router.navigateByUrl("/auth/login");
      }
    }
    )
  }

  public async authenticateFirebase(user1:UserCred){

    this.isAuthError.set(false);

    const subscription = from(signInWithEmailAndPassword(this.auth, user1.email, user1.password))
    .pipe(
      catchError((res:FirebaseError) => {
        this.user.set(null);
        this.isAuthenticated = false;
        this.isAuthError.set(true);
        this.currentError.code = "";
        this.currentError.message = res.code;
        this.saveToLocalStorage("");
        subscription.unsubscribe();
        return of();
      })
    )
    .subscribe(async (res) => {
      const tokenRes = await res.user.getIdToken();
      this.deleteCurrentError();
      this.saveToLocalStorage(tokenRes);
      this.getUserRelated(tokenRes);
      this.isAuthError.set(false);
      subscription.unsubscribe();
    })

  }

  public pingToken(){
    const tempToken = this.getFromLocalStorage();
    if(tempToken === null){
      this.logout();
      return;
    }

    const subscription = this.http.post(`${this.baseUrl}/api/verifyToken`,null,
    {
      headers:{["Authorization"]: tempToken}
    })
    .subscribe({
      next: (res) => {
        subscription.unsubscribe();
      },
      error: (err) => {
        this.isAuthenticated = false;
        subscription.unsubscribe();
        this.authSubscription?.unsubscribe();
        this.logout();
      }
    })
  }

  public startAuthSubscription(){
    this.authSubscription = interval(1000 * 60,)
    .subscribe((res) => {
      this.pingToken();
    })
  }

  public getUserRelated(token:string){

    if(token === null) return;

    const subscription = this.http.post<UserResponse>(`${this.baseUrl}/api/login`,null,
        {
          headers:{["Authorization"]: token}
        }
    )
    .pipe(
      catchError((res) => {
        if(res.status === 500) return of();
        this.user.set(null);
        this.isAuthenticated = false;
        this.isAuthError.set(true);
        this.currentError.code = res.status;
        this.currentError.message = res.statusText;
        this.saveToLocalStorage("");
        subscription.unsubscribe();
        return of();
      })
    )
    .subscribe(res => {
      this.user.set({ firstName:res.firstName , email: res.email });
      if(res?.image) this.profilePicture = res.image;
      this.isAuthError.set(false);
      this.isAuthenticated = true;
      subscription.unsubscribe();
      this.startAuthSubscription();
      if(res.privileges){
        this.router.navigateByUrl('/adm/login')
      }else{
        this.router.navigateByUrl('/')
      }
    })
  }

  public logout(){
    this.saveToLocalStorage("");
    this.user.set(null);
    this.isAuthenticated = false;
    this.router.navigateByUrl('/auth/login');
    this.authSubscription?.unsubscribe();
    this.profilePicture = undefined;
  }

  public actualAuthenticate(){

    const token = this.getFromLocalStorage();
    if(token === null) return;

    const subscription = this.http.post(`${this.baseUrl}/api/post`,null,
        {
          headers:{["Authorization"]: token}
        }
    ).subscribe(res => {
      subscription.unsubscribe();
    })
  }

  public getProducts(){
    return;
  }

  public get isAuthenticationError(){
    return this.isAuthError;
  }

  public get getErrorMessage(){
    return this.currentError;
  }


}
