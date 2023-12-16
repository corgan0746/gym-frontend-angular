import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { GymService } from 'src/app/gym/service/gym.service';
import { environment } from 'src/environments/environment';
import { MembershipAdminResponse, ResponseMembership } from '../../interfaces/membership.admin.interface';
import { AdmService } from '../../service/adm.service';

@Component({
  selector: 'app-memberships-admin',
  templateUrl: './memberships-admin.component.html',
  styleUrls: ['./memberships-admin.component.css']
})
export class MembershipsAdminComponent {


  private baseUrl = environment.baseUrl;
  public memberships: ResponseMembership[] = [];

  private gymService = inject(GymService);
  private admService = inject(AdmService);

  public isEditMembership:boolean = false;
  public isEditClassesMembership:boolean = false;

  public isAdd:boolean = false;

  public currentMembership?:ResponseMembership;

  constructor(){
    this.getMemberships();
  }


  public getMemberships(){
    const subscription = this.gymService.generateGetObservable<ResponseMembership[]>(`${this.baseUrl}/api/membershipClasses`)
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        subscription.unsubscribe();
      },
      next:(res) => {
        this.memberships =  res;
        subscription.unsubscribe();
      }
    })
  }

  public openEditMembership(membershipInput:ResponseMembership){
    this.currentMembership = membershipInput;
    this.isEditMembership = true;
    this.isEditClassesMembership = false;
    this.isAdd = false;
  }

  public closeEditMembership(){
    this.isEditMembership = false;
    this.getMemberships();
  }

  public openEditMembershipClasses(membershipInput:ResponseMembership){
    this.currentMembership = membershipInput;
    this.isEditMembership = false;
    this.isEditClassesMembership = true;
    this.isAdd = false;
  }

  public closeEditMembershipClasses(){
    this.isEditClassesMembership = false;
    this.isAdd = false;
    this.getMemberships();
  }

  public openDeleteMembership(id:number){
    this.admService.setConfirmDelete(`${this.baseUrl}/api/action/dispatch/deleteMembership/${id}`);
  }

  public openAddMembership(){
    this.isEditMembership = true;
    this.isAdd = true;
    this.currentMembership = undefined;
  }

  public notPropagate(e:Event){
    e.stopPropagation();
  }

}
