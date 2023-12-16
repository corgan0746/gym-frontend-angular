import { Component, inject } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AuthService } from 'src/app/auth/service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  standalone: true,
  imports: [SideMenuComponent, SearchBarComponent, CommonModule, RouterModule]
})
export class TopBarComponent {

  public openMenu: boolean = false;

  private authService = inject(AuthService);

  public aws = environment.awsBucket;
  public photo?:string;

  public get getName(){
    return this.authService.getUser()?.firstName;
  }

  public get isAuthenticated(){
    return this.authService.getIsAuthenticated;
  }

  public toggleMenu(){
    this.openMenu = !this.openMenu;
  }

  ngOnInit(){
    this.photo = this.authService.profilePicture;
  }

}
