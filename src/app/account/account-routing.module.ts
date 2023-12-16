import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAccountComponent } from './pages/main-account/main-account.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { MembershipsListComponent } from './components/memberships-list/memberships-list.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { BillingComponent } from './components/billing/billing.component';

const routes: Routes = [
  {
    path: '',
    component: MainAccountComponent,
    children:[
      {
        path:'details',
        component: AccountDetailsComponent
      },
      {
        path:'memberships',
        component: MembershipsListComponent
      },
      {
        path:'billing',
        component: BillingComponent
      },
      {
        path:'bookings',
        component: BookingsComponent
      },
      {
        path:'**',
        redirectTo: 'details'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
