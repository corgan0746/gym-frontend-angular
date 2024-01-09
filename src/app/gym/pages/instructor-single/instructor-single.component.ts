import { Component, Input, inject } from '@angular/core';
import { Class } from '../../interfaces/class.interface';
import { Instructor, SearchResponseInstructor } from '../../interfaces/instructor.interface';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GymService } from '../../service/gym.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './instructor-single.component.html',
  styleUrls: ['./instructor-single.component.css']
})
export class InstructorSingleComponent {

  @Input()
  private id?:number;

  private gymService = inject(GymService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  public classes?:Class[];
  public instructor?:Instructor;
  public fetchedData:boolean = false;
  public isLoading:boolean = false;
  private baseUrl = environment.baseUrl;
  public awsBucket = environment.awsBucket;

  public get getCurrentClass(){
    return this.classes;
  }

  constructor(){
    this.getClass();
  }

  public getClass(){
    this.isLoading = true;
    const subscription = this.activeRoute.params.pipe(
    switchMap((id:Params) => this.gymService.generateGetObservable<Instructor>(`${this.baseUrl}/api/instructor/${id['id']}`))
    )
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        subscription.unsubscribe();
        this.isLoading = false;
        this.router.navigateByUrl("/instructors");
      },
      next:(res:Instructor) => {
        this.instructor =  res;
        this.getInstructorClasses(res._links.classes.href.replace('http', 'https'));
        subscription.unsubscribe();
      }
    })
  }

  public getInstructorClasses(url:string){
    const subscription =  this.gymService.generateGetObservable<SearchResponseInstructor>(url)
    .subscribe({
      next:(res:SearchResponseInstructor)=> {
        this.classes = res._embedded.classes;
        subscription.unsubscribe();
        this.isLoading = false;
      },
      error:(err:HttpErrorResponse) =>{
        subscription.unsubscribe();
        this.isLoading = false;
      }
    })
  }

}
