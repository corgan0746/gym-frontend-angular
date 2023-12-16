import { Component, inject } from '@angular/core';
import { Instructor, SearchResponseInstructor } from '../../interfaces/instructor.interface';
import { GymService } from '../../service/gym.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent {

  private gymService = inject(GymService);

  public instructors:Instructor[] = [];
  public fetchedData:boolean = false;
  private baseUrl = environment.baseUrl;

  public get allClasses(){
    return this.instructors;
  }

  ngOnInit(): void {
    this.getClasses();
  }

  public getClasses(){
    const subscription = this.gymService.generateGetObservable<SearchResponseInstructor>(`${this.baseUrl}/api/instructor`)
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        subscription.unsubscribe();
      },
      next:(res) => {
        this.instructors =  res._embedded.instructor;
        this.fetchedData = true;
        subscription.unsubscribe();
      }
    })
  }
}
