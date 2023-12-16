import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClassesListComponent } from './pages/classes-list/classes-list.component';
import { ClassSingleComponent } from './pages/class-single/class-single.component';
import { InstructorListComponent } from './pages/instructor-list/instructor-list.component';
import { InstructorSingleComponent } from './pages/instructor-single/instructor-single.component';
import { MembershipsListComponent } from './pages/memberships-list/memberships-list.component';
import { MembershipSingleComponent } from './pages/membership-single/membership-single.component';

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent,
  },
  {
    path:'classes',
    component: ClassesListComponent
  },
  {
    path:'classes/:query',
    component: ClassesListComponent
  },
  {
    path:'class/:id',
    component: ClassSingleComponent
  },
  {
    path:'instructors',
    component: InstructorListComponent
  },
  {
    path:'memberships',
    component: MembershipsListComponent
  },
  {
    path:'membership/:id',
    component: MembershipSingleComponent
  },
  {
    path:'instructor/:id',
    component: InstructorSingleComponent
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymRoutingModule { }
