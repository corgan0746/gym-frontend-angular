import { Component, inject } from '@angular/core';
import { GymService } from '../../service/gym.service';
import { Membership, SearchResponseMembership } from '../../interfaces/membership.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs';

@Component({
  selector: 'app-memberships-list',
  templateUrl: './memberships-list.component.html',
  styleUrls: ['./memberships-list.component.css']
})
export class MembershipsListComponent {

  private gymService = inject(GymService);

  public memberships:Membership[] = [];
  public isLoading:boolean = false;
  private baseUrl = environment.baseUrl;

  ngOnInit(): void {
    this.getMemberships();
  }

  public getMemberships(){
    this.isLoading = true;
    const subsription =  this.gymService.generateGetObservable<SearchResponseMembership>(`${this.baseUrl}/api/membership`)
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        subsription.unsubscribe();
        this.isLoading = false;
      },
      next:(res) => {
        this.memberships =  res._embedded.membership;
        subsription.unsubscribe();
        this.isLoading = false;
      }
    })
  }

}
