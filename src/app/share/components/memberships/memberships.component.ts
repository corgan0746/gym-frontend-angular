import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Membership } from 'src/app/gym/interfaces/membership.interface';
import { Class } from 'src/app/gym/interfaces/class.interface';

@Component({
  selector: 'membership-item',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.css'],
  standalone:true,
  imports:[CommonModule, RouterModule]
})
export class MembershipsComponent {

  private router = inject(Router);

  @Input()
  public membership?:Membership;

  @Input()
  public isAccount:boolean = false;

  @Input()
  public classes:Class[] = [];

  @Input()
  public isRenew:boolean = false;

  public image?:string;

  ngOnInit(){
    if(this.membership?.image){
      this.image = this.membership.image;
    }
  }

  public goMembership(id:number){
    if(id === undefined) return;
    this.router.navigateByUrl(`/membership/${id}`)
  }

}
