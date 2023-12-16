import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { MainPanelComponent } from './pages/main-panel/main-panel.component';
import { InstructorsAdminComponent } from './components/instructors-admin/instructors-admin.component';
import { AdminSideMenuComponent } from './components/admin-side-menu/admin-side-menu.component';
import { GymPanelComponent } from './pages/gym-panel/gym-panel.component';
import { CustomersPanelComponent } from './pages/customers-panel/customers-panel.component';
import { AccountPanelComponent } from './pages/account-panel/account-panel.component';
import { ClassesAdminComponent } from './components/classes-admin/classes-admin.component';
import { MembershipsAdminComponent } from './components/memberships-admin/memberships-admin.component';
import { ManagementButtonsComponent } from '../share/components/management-buttons/management-buttons.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponseMessageComponent } from './components/response-message/response-message.component';
import { BookingsEditComponent } from './components/bookings-edit/bookings-edit.component';
import { UserMembershipEditComponent } from './components/user-membership-edit/user-membership-edit.component';
import { ClassesEditComponent } from './components/classes-edit/classes-edit.component';
import { ClassInstructorEditComponent } from './components/class-instructor-edit/class-instructor-edit.component';
import { ClassTimeslotsEditComponent } from './components/class-timeslots-edit/class-timeslots-edit.component';
import { InstructorEditComponent } from './components/instructor-edit/instructor-edit.component';
import { InstructorClassesEditComponent } from './components/instructor-classes-edit/instructor-classes-edit.component';
import { MembershipEditComponent } from './components/membership-edit/membership-edit.component';
import { MembershipClassesEditComponent } from './components/membership-classes-edit/membership-classes-edit.component';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { ImageDisplayComponent } from '../share/components/image-display/image-display.component';


@NgModule({
  declarations: [
    LoginAdminComponent,
    MainPanelComponent,
    InstructorsAdminComponent,
    AdminSideMenuComponent,
    GymPanelComponent,
    CustomersPanelComponent,
    AccountPanelComponent,
    ClassesAdminComponent,
    MembershipsAdminComponent,
    CustomerEditComponent,
    ResponseMessageComponent,
    BookingsEditComponent,
    UserMembershipEditComponent,
    ClassesEditComponent,
    ClassInstructorEditComponent,
    ClassTimeslotsEditComponent,
    InstructorEditComponent,
    InstructorClassesEditComponent,
    MembershipEditComponent,
    MembershipClassesEditComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    CommonModule,
    AdmRoutingModule,
    ManagementButtonsComponent,
    ReactiveFormsModule,
    FormsModule,
    ImageDisplayComponent
  ]
})
export class AdmModule { }
