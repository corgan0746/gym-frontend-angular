import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymRoutingModule } from './gym-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopBarComponent } from '../share/components/top-bar/top-bar.component';
import { HomeBannersComponent } from './components/home-banners/home-banners.component';
import { ClassItemComponent } from './components/class-item/class-item.component';
import { ClassesListComponent } from './pages/classes-list/classes-list.component';
import { ClassSingleComponent } from './pages/class-single/class-single.component';
import { InstructorItemComponent } from './components/instructor-item/instructor-item.component';
import { InstructorListComponent } from './pages/instructor-list/instructor-list.component';
import { InstructorSingleComponent } from './pages/instructor-single/instructor-single.component';
import { MembershipsListComponent } from './pages/memberships-list/memberships-list.component';
import { MembershipsComponent } from '../share/components/memberships/memberships.component';
import { MembershipSingleComponent } from './pages/membership-single/membership-single.component';
import { ImageDisplayComponent } from '../share/components/image-display/image-display.component';
import { TextCarouselComponent } from '../share/components/text-carousel/text-carousel.component';
import { BackgroundMainComponent } from '../share/components/background-main/background-main.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeBannersComponent,
    ClassItemComponent,
    ClassesListComponent,
    ClassSingleComponent,
    InstructorItemComponent,
    InstructorListComponent,
    InstructorSingleComponent,
    MembershipsListComponent,
    MembershipSingleComponent
  ],
  imports: [
    CommonModule,
    GymRoutingModule,
    ReactiveFormsModule,
    TopBarComponent,
    MembershipsComponent,
    ImageDisplayComponent,
    TextCarouselComponent,
    BackgroundMainComponent

  ]
})
export class GymModule { }
