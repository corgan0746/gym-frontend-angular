import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ClassTypes, Classes } from '../../interfaces/customers.admin.interface';
import { environment } from 'src/environments/environment';
import { GymService } from 'src/app/gym/service/gym.service';
import { AdmService } from '../../service/adm.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'classes-edit',
  templateUrl: './classes-edit.component.html',
  styleUrls: ['../../shared-css/shared-css.component.css']
})
export class ClassesEditComponent {

  @Output() closeEdit = new EventEmitter<string>();

  @Input()
  public classes?:Classes;

  @Input()
  public isAdd:boolean = false;

  public classTypes:ClassTypes[]= [];

  public photoFile:File | null = null;

  private baseUrl:string = environment.baseUrl;
  private gymService = inject(GymService);
  private admService = inject(AdmService);

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    if(this.classes !== undefined){
      const {classTypes, value, name, code, id, description} = this.classes;
      this.updateForm.setValue({classTypes:classTypes.id, value, name, code, id, description});
    }
    this.getClassTypes();
  }

  public updateForm: FormGroup = this.fb.group({
    id:['',[Validators.required]],
    name:['', [Validators.required]],
    code:['', [Validators.required]],
    value:['', [Validators.required]],
    description:[''],
    classTypes:['', [Validators.requiredTrue]]
  }
  )

  public getClassTypes(){
    const subscription = this.gymService.generatePostObservable<ClassTypes[]>(`${this.baseUrl}/api/action/dispatch/allClassTypes`)
    .subscribe((res) => {
        this.classTypes = res;
        subscription.unsubscribe();
      }
    )
  }

  public updateClass(){

    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/updateClass`, this.updateForm.value)
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
  public addClass(){
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/createClass`, this.updateForm.value)
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

  public changePicture(e:any){
    this.photoFile = e.target['files'][0];

    if(this.photoFile == null) return;

    if(this.photoFile.type == 'image/png' || this.photoFile.type == 'image/jpeg' ){

        let imgBitmap = createImageBitmap(this.photoFile).then( async (img) => {

            let convertedImg = this.convertImage(img);

            const blobConverted = await (await fetch(convertedImg)).blob();

            const fileName = 'converted-image';
            const fileType = 'image/webp';
            const convertedFile = new File([blobConverted], fileName, { type: fileType });
            this.photoFile = convertedFile;
        })
    }else if(this.photoFile.type == 'image/webp'){
        console.log("correct format");
    }else{
        console.log("Image File not compatible");
    }
  }

  public uploadPhoto(e:any){
    e.preventDefault();

      if(this.photoFile){
      const formData = new FormData();
      formData.append('file', this.photoFile);

      if(!this.classes?.id){
        return;
      }

      const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/classPicture/${this.classes?.id}`, formData)
        .subscribe((res) => {
        this.admService.setIsSuccess(true);
        this.admService.setIsMessage(true);
        subscription.unsubscribe();
        this.closeWindow();
        })
      }

  }

  public convertImage(pngImage:ImageBitmap){


    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = pngImage.width;
    canvas.height = pngImage.height;

    ctx!.drawImage(pngImage, 0, 0);

    const dataUrl = canvas.toDataURL(`image/webp`, 0.2);
    return dataUrl;

  }

  public closeWindow(){
    this.closeEdit.emit("close");
  }

  public selectClassType(target:any){
    this.updateForm.setValue({...this.updateForm.value, classTypes: parseInt(target.value)});
  }

  public submit(){
    this.updateClass();
  }

  public add(){
    this.addClass();
  }

}
