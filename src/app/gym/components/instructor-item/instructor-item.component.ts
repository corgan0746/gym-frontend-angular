import { Component, Input } from '@angular/core';
import { Instructor } from '../../interfaces/instructor.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'instructor-item',
  templateUrl: './instructor-item.component.html',
  styleUrls: ['./instructor-item.component.css']
})
export class InstructorItemComponent {


  @Input()
  public instructor?:Instructor;

  public awsBucket = environment.awsBucket;
  
  constructor(){
  }


}
