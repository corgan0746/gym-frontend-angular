import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { MainAccountComponent } from './pages/main-account/main-account.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { MembershipsListComponent } from './components/memberships-list/memberships-list.component';
import { BillingComponent } from './components/billing/billing.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { MembershipsComponent } from '../share/components/memberships/memberships.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageDisplayComponent } from '../share/components/image-display/image-display.component';


@NgModule({
  declarations: [
    MainAccountComponent,
    AccountDetailsComponent,
    MembershipsListComponent,
    BillingComponent,
    BookingsComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MembershipsComponent,
    ReactiveFormsModule,
    ImageDisplayComponent
  ]
})
export class AccountModule { }
