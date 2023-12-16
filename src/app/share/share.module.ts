import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { ErrorComponent } from './pages/error/error.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';


@NgModule({
  declarations: [
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    ShareRoutingModule
  ],
  exports: [
  ]
})
export class ShareModule { }
