import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { Classes, Timeslot } from '../../interfaces/customers.admin.interface';
import { environment } from 'src/environments/environment';
import { GymService } from 'src/app/gym/service/gym.service';
import { AdmService } from '../../service/adm.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'class-timeslots-edit',
  templateUrl: './class-timeslots-edit.component.html',
  styleUrls: ['../../shared-css/shared-css.component.css']
})
export class ClassTimeslotsEditComponent {

  @Output() closeEdit = new EventEmitter<string>();

  @Input()
  public classes?:Classes;

  private baseUrl:string = environment.baseUrl;
  private gymService = inject(GymService);
  private admService = inject(AdmService);

  private fb = inject(FormBuilder);

  public selectedTimeslot?:Timeslot;
  public timeslots:Timeslot[] = [];

  public hours = new Array(24);
  public minutes = [0,15,30,45];


  ngOnInit(): void {
    if(this.classes !== undefined){
      this.timeslots = this.classes?.timeslots || [];
      this.updateForm.setValue({id:'', startHour:'', endHour:'', startMinutes:'', endMinutes:'', classes:this.classes?.id, open:false})
    }
  }


  public updateForm: FormGroup = this.fb.group({
    id:[''],
    classes:['', [Validators.required]],
    startHour:['', [Validators.required]],
    endHour:['', [Validators.required]],
    startMinutes:['', [Validators.required]],
    endMinutes:['', [Validators.required]],
    open:[false, [Validators.required]]
  }
  )

  public updateTimeslot(){
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/updateTimeslot`, this.updateForm.value)
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        this.admService.setIsSuccess(false);
        this.admService.setIsMessage(true);
        subscription.unsubscribe();
      },
      next:(res) => {
        this.admService.setIsSuccess(true);
        this.admService.setIsMessage(true);
        subscription.unsubscribe();
        this.closeWindow();
      }
    })
  }

  public createTimeslot(){
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/addTimeslot`, this.updateForm.value)
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        this.admService.setIsSuccess(false);
        this.admService.setIsMessage(true);
        subscription.unsubscribe();
      },
      next:(res) => {
        this.admService.setIsSuccess(true);
        this.admService.setIsMessage(true);
        subscription.unsubscribe();
        this.closeWindow();
      }
    })
  }

  public deleteTimeslot(id:number | undefined){
    if(id === undefined) return;
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/deleteTimeslot/${id}`)
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        this.admService.setIsSuccess(false);
        this.admService.setIsMessage(true);
        subscription.unsubscribe();
      },
      next:(res) => {
        this.admService.setIsSuccess(true);
        this.admService.setIsMessage(true);
        subscription.unsubscribe();
        this.closeWindow();
      }
    })
  }

  public selectTimeslot(target:any){
    this.selectedTimeslot = this.timeslots[target.value];
    const {id,  open} = this.selectedTimeslot;

    const convertStartTime:string = this.selectedTimeslot.startTime;
    const convertEndTime:string = this.selectedTimeslot.endTime;
    const timeComponentsStart = convertStartTime.split(':');
    const timeComponentsEnd = convertEndTime.split(':');

    const dateStart = new Date();
    dateStart.setHours(parseInt(timeComponentsStart[0], 10));
    dateStart.setMinutes(parseInt(timeComponentsStart[1], 10));

    const dateEnd = new Date();
    dateEnd.setHours(parseInt(timeComponentsEnd[0], 10));
    dateEnd.setMinutes(parseInt(timeComponentsEnd[1], 10));

    this.updateForm.setValue({id, startHour:dateStart.getHours(), endHour:dateEnd.getHours(), startMinutes:dateStart.getMinutes(), endMinutes:dateEnd.getMinutes(), open, classes:this.classes?.id})
  }

  public selectStartMinute(target:any){
    this.updateForm.setValue({...this.updateForm.value, startMinutes: target.value})
  }
  public selectStartHour(target:any){
    this.updateForm.setValue({...this.updateForm.value, startHour: target.value})
  }
  public selectEndHour(target:any){
    this.updateForm.setValue({...this.updateForm.value, endHour: target.value})
  }
  public selectEndMinute(target:any){
    this.updateForm.setValue({...this.updateForm.value, endMinutes: target.value})
  }

  public closeWindow(){
    this.closeEdit.emit("close");
  }


  public submit(mode:string){
    (mode === "create")? this.createTimeslot(): this.updateTimeslot();

  }
}
