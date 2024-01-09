import { Component, OnInit, inject } from '@angular/core';
import { GymService } from '../../service/gym.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Class, ClassTypes, SearchResponse } from '../../interfaces/class.interface';
import { ActivatedRoute } from '@angular/router';
import { Subscription, delay } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css']
})
export class ClassesListComponent implements OnInit {

  private gymService = inject(GymService);
  private activeRoute = inject(ActivatedRoute);

  public baseUrl = environment.baseUrl;

  public searchedTerm:string = "";
  public currentQueryValue:string = "";
  public subscriptionSearch?:Subscription;
  public classes:Class[] = [];
  public fetchedData:boolean = false;
  public classTypes:ClassTypes[]=[];
  public isLoading:boolean = false;

  public get allClasses(){
    return this.classes;
  }

  ngOnInit(): void {

    const subscriptionSearch = this.activeRoute.params.subscribe((res) => {
      const currentQuery = res["query"];
      if(currentQuery !== undefined){
        this.currentQueryValue = currentQuery;
        this.searchedTerm = `For "${currentQuery}"`;
        this.searchClasses(currentQuery, "");
        return;
      }
      this.currentQueryValue = ""
      this.searchedTerm = "";
      this.getClasses("");
    });

    this.getClassTypes();

  }

  public getClasses(mode:string){
    this.isLoading = true;
    const subscription = this.gymService.getAllClasses(mode)
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        subscription.unsubscribe();
        this.isLoading = false;
      },
      next:(res:SearchResponse) => {
        this.classes =  res._embedded.classes;
        this.fetchedData = true;
        subscription.unsubscribe();
        this.isLoading = false;
      }
    })
  }

  public searchClasses(query:string, mode:string){
    this.isLoading = true;
    const subscription = this.gymService.searchClasses(query, mode)
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        subscription.unsubscribe();
        this.isLoading = false;
      },
      next:(res:SearchResponse) => {
        this.classes =  res._embedded.classes;
        this.fetchedData = true;
        subscription.unsubscribe();
        this.isLoading = false;
      }
    })

  }

  public getClassTypes(){
    const subscription = this.gymService.generateGetObservable<ClassTypes[]>(`${this.baseUrl}/api/allClassTypes`)
    .subscribe((res) => {
        this.classTypes = res;
        subscription.unsubscribe();
      }
    )
  }

  public getClassesByTypes(id:any){
    if(!id) return;
    const subscription = this.gymService.generateGetObservable<Class[]>(`${this.baseUrl}/api/getByType/${id}`)
    .subscribe((res) => {
        this.classes = res;
        subscription.unsubscribe();
      }
    )
  }

  public selectionChanged(e:any){
    if(this.currentQueryValue !== ""){
      this.searchClasses(this.currentQueryValue, e.currentTarget.value);
    }
    this.getClasses(e.currentTarget.value);
  }

  ngOnDestroy(){
    this.subscriptionSearch?.unsubscribe();
  }

  public selectType(e:any){
    this.getClassesByTypes(e.target.value);
  }

}
