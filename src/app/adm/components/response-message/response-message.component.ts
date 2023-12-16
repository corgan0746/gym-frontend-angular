import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-response-message',
  templateUrl: './response-message.component.html',
  styleUrls: ['./response-message.component.css']
})
export class ResponseMessageComponent {

  @Input()
  public isSuccess?:boolean;

  @Output() triggerDestroy = new EventEmitter<string>();

  public timer = timer(10000);
  public subscription?:Subscription;

  ngOnInit(){
    this.subscription = this.timer.subscribe(()=>{
      this.destroyThis();
    })

  }

  public destroyThis(){
    this.triggerDestroy.emit("destroy");
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

}
