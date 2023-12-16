import { Component, Input, inject } from '@angular/core';
import { GymService } from '../../service/gym.service';
import { Class, Timeslot } from '../../interfaces/class.interface';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { Instructor } from '../../interfaces/instructor.interface';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  templateUrl: './class-single.component.html',
  styleUrls: ['./class-single.component.css']
})
export class ClassSingleComponent {

  @Input()
  private id?:number;

  public gymService = inject(GymService);
  public authService = inject(AuthService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  public class?:Class;
  public instructor?:Instructor;
  public fetchedData:boolean = false;
  private baseUrl = environment.baseUrl;
  public awsBucket = environment.awsBucket;

  public slotId?:number;

  public timeslotsAvailable:Timeslot[] = [];

  public currentDate = new Date();


  constructor(){
    this.getClass();
  }

  ngOnInit(){
    this.gymService.bookingError = "";
    this.gymService.bookingSuccess = "";
  }

  public getClass(){
    const subscription = this.activeRoute.params.pipe(
      switchMap((id:Params) => this.gymService.getSingleClass(id['id']) )
    )
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        subscription.unsubscribe();
        this.router.navigateByUrl("/classes");
      },
      next:(res:Class) => {

        this.class = res;
        if( this.class.timeslots && this.class.timeslots.length > 0){

          const referenceDate = new Date();
          this.class.timeslots = this.class.timeslots.map((ele) => {
            const stringDate = ele.startTime.split(':');
            referenceDate.setHours(parseInt(stringDate[0], 10));
            referenceDate.setMinutes(parseInt(stringDate[1], 10));
            ele.open = (this.currentDate < referenceDate)? true: false;
            return ele;
          })

          this.class.timeslots = this.class.timeslots.sort((a, b) => ((b.open)? 1:0) - ((a.open)? 1:0) );


          this.timeslotsAvailable =  this.class.timeslots.filter((ele) => ele.open === true);
        }
        subscription.unsubscribe();
        this.fetchedData = true;
        this.getClassInstructor(this.class.id);
      }
    })
  }

  public getClassInstructor(id:number){
    const subscription = this.gymService.generateGetObservable<Instructor>(`${this.baseUrl}/api/classes/${id}/instructor`)
    .subscribe({
      next:(res:Instructor)=> {
        this.instructor = res;
        subscription.unsubscribe();
      },
      error:(err) =>{
        subscription.unsubscribe();
      }
    })
  }

  public bookClass(){

    if(!this.authService.getIsAuthenticated){
      this.router.navigateByUrl("/auth/login");
    }

    if(this.class?.code){
      if(this.slotId){
        this.gymService.bookClass(this.class.code, this.slotId);
      }
    }
  }

  public selectTimeslot(target:any){
    this.slotId = target.value;
  }

}
