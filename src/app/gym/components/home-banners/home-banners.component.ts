import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { GymService } from '../../service/gym.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'home-banners',
  templateUrl: './home-banners.component.html',
  styleUrls: ['./home-banners.component.css']
})
export class HomeBannersComponent {

  @ViewChild("#photoUpload") photoEle?: ElementRef;

  private gymService = inject(GymService);

  private baseUrl = environment.baseUrl;

  public photoFile:File | null = null;

  public loadImage(e:any){
    if(!e.target?.files){
      return;
    }
    this.photoFile = e.target['files'][0];
  }

  public sendPhoto(){

    if(this.photoFile){
    const formData = new FormData();
    formData.append('file', this.photoFile);

    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/profilePicture`, formData)
      .subscribe((res) => {
        subscription.unsubscribe();
      })
    }
  }

}
