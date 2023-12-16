import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { MainPanelComponent } from './pages/main-panel/main-panel.component';
import { InstructorsAdminComponent } from './components/instructors-admin/instructors-admin.component';
import { GymPanelComponent } from './pages/gym-panel/gym-panel.component';
import { CustomersPanelComponent } from './pages/customers-panel/customers-panel.component';
import { AccountPanelComponent } from './pages/account-panel/account-panel.component';
import { ClassesAdminComponent } from './components/classes-admin/classes-admin.component';
import { MembershipsAdminComponent } from './components/memberships-admin/memberships-admin.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginAdminComponent
  },
  {
    path: 'panel',
    component: MainPanelComponent,
    children:[
      {
        path:'gym',
        component: GymPanelComponent,
        children:[
          {
            path: 'instructors',
            component: InstructorsAdminComponent
          },
          {
            path: 'classes',
            component: ClassesAdminComponent
          },
          {
            path: 'memberships',
            component: MembershipsAdminComponent
          },
          {
            path:'',
            redirectTo:'classes',
            pathMatch:'prefix'
          },
        ]
      },
      {
        path:'customers',
        component: CustomersPanelComponent,
      },
      {
        path:'account',
        component: AccountPanelComponent
      },
      {
        path:'',
        redirectTo:'gym',
        pathMatch:'prefix'
      },
      {
        path:'**',
        redirectTo: '/panel/gym'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
