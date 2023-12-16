import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdmService {

  private isAuthenticatedAdm:boolean = true;

  public isSuccess?:boolean;
  public isMessage:boolean = false;

  public isConfirmDelete:boolean = false;
  public urlCallback:string = "";
  public bodyCallback:any;

  constructor() { }

  public setIsSuccess(success:boolean){
    this.isSuccess = success;
  }

  public setIsMessage(active:boolean){
    this.isMessage = active;
  }

  public setConfirmDelete(urlParam:string, bodyParam:any = null){
    this.isConfirmDelete = true;
    this.urlCallback = urlParam;
    this.bodyCallback = bodyParam;
  }

  public abortDelete(){
    this.isConfirmDelete = false;
    this.urlCallback = "";
    this.bodyCallback = null
  }



}
