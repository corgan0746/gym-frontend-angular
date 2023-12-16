import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'background-main',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './background-main.component.html',
  styleUrls: ['./background-main.component.css'],
})
export class BackgroundMainComponent {

  public scroll:number = 0;

  private subscriptionListener?:Subscription;

  ngOnInit(){
    this.subscriptionListener = fromEvent(window, 'scroll').subscribe((res) => {
      this.scroll = window.scrollY/200;
    })
  }

  ngOnDestroy(){
    this.subscriptionListener?.unsubscribe();
  }
}
