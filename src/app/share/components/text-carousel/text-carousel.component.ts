import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Subscription, interval, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'text-carousel',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './text-carousel.component.html',
  styleUrls: ['./text-carousel.component.css'],
})
export class TextCarouselComponent {

  @Input()
  public inputArray?:string[];

  public myArr:string[] = [];

  private subscription:Subscription|undefined = undefined;

  public nextText:string = ''
  public currentText:string = '';
  public currentCounter:number = 0;
  public transitioning:boolean = false;

  ngOnInit(){
    if(!this.inputArray) return;

    this.myArr = this.inputArray;

    if(this.inputArray.length > 1){
      this.currentCounter = 0;
      this.currentText = this.myArr[this.currentCounter];
      this.nextText = this.myArr[this.currentCounter+1];
      this.currentCounter++;


    interval(5000)
    .subscribe( async (res) => {

      await this.transition();

      if(this.currentCounter == this.myArr.length){
        this.currentCounter = 0;
        this.currentText = this.myArr[this.currentCounter];
        this.nextText = this.myArr[this.currentCounter+1];
        this.currentCounter++;
        return
      }

      if(this.currentCounter+1 < this.myArr.length){
        this.currentText = this.myArr[this.currentCounter];
        this.nextText = this.myArr[this.currentCounter+1];
        this.currentCounter++;
      }else{
        this.currentText = this.myArr[this.currentCounter];
        this.nextText = this.myArr[0];
        this.currentCounter++;
      }
    })
    }
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  public async  transition(){
    this.transitioning = true;

    const sub = timer(1000).subscribe((res) =>{
      this.transitioning = false;
      sub.unsubscribe();
      return;
    })
  }

}
