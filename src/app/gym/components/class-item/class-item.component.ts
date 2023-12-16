import { Component, Input, inject } from '@angular/core';
import { Class } from '../../interfaces/class.interface';
import { GymService } from '../../service/gym.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'class-item',
  templateUrl: './class-item.component.html',
  styleUrls: ['./class-item.component.css']
})
export class ClassItemComponent  {

  public awsBucket = environment.awsBucket;

  @Input()
  public class?:Class;

  public timeslotLength?:number;

  ngOnInit(){
    this.timeslotLength = this.class?.timeslots?.length;
  }


}
