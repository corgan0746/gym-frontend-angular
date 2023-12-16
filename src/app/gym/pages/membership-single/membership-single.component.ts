import { Component, Input, inject } from '@angular/core';
import {  Membership, ResponseMembershipAndClasses } from '../../interfaces/membership.interface';
import { GymService } from '../../service/gym.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Class } from '../../interfaces/class.interface';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './membership-single.component.html',
  styleUrls: ['./membership-single.component.css']
})
export class MembershipSingleComponent {



  @Input()
  private id?:number;

  public gymService = inject(GymService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  public classes?:Class[];
  public membership?:Membership;
  private baseUrl = environment.baseUrl;
  public awsBucket = environment.awsBucket;

  public get getCurrentClass(){
    return this.classes;
  }

  constructor(){
    this.getInstructorWithClasses();
  }

  ngOnInit(){
    this.gymService.bookingError = "";
  }

  public getInstructorWithClasses(){
    const subsription = this.activeRoute.params.pipe(
      switchMap((id:Params) => this.gymService.generateGetObservable<ResponseMembershipAndClasses>(`${this.baseUrl}/api/getClassesFromMembership/${id['id']}`))
    )
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        subsription.unsubscribe();
        this.router.navigateByUrl("/memberships");
      },
      next:(res:ResponseMembershipAndClasses) => {
        this.membership = res;
        this.classes = res.classes;
        subsription.unsubscribe();
      }
    })
  }

  public buyMembership(){
    if(this.membership?.code){
      this.gymService.buyMembership(this.membership.code);
    }
  }

}
