import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Instructor } from 'src/app/gym/interfaces/instructor.interface';
import { GymService } from 'src/app/gym/service/gym.service';
import { environment } from 'src/environments/environment';
import { AdmService } from '../../service/adm.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'instructor-edit',
  templateUrl: './instructor-edit.component.html',
  styleUrls: ['../../shared-css/shared-css.component.css']
})
export class InstructorEditComponent {

  @Output() closeEdit = new EventEmitter<string>();

  @Input()
  public instructor?:Instructor;

  @Input()
  public isAdd:boolean = false;


  public photoFile:File | null = null;

  private baseUrl:string = environment.baseUrl;
  private gymService = inject(GymService);
  private admService = inject(AdmService);

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    if(this.instructor !== undefined){
      const {firstName, lastName, bios, email, id} = this.instructor;
      this.updateForm.setValue({firstName, lastName, bios, email, id});
    }
  }

  public updateForm: FormGroup = this.fb.group({
      id:[''],
      email:['', [Validators.required]],
      firstName:['', [Validators.required]],
      lastName:['', [Validators.required]],
      bios:[true, [Validators.requiredTrue]]
    }
  )

  public updateInstructor(){
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/updateInstructor`, this.updateForm.value)
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

  public addInstructor(){
    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/addInstructor`, this.updateForm.value)
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        this.admService.setIsSuccess(false);
        this.admService.setIsMessage(true);
        subscription.unsubscribe()
      },
      next:(res) => {
        this.admService.setIsSuccess(true);
        this.admService.setIsMessage(true);
        subscription.unsubscribe()
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

      if(!this.instructor?.id){
        return;
      }

      const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/action/dispatch/instructorPicture/${this.instructor?.id}`, formData)
        .subscribe((res) => {
        this.admService.setIsSuccess(true);
        this.admService.setIsMessage(true);
        subscription.unsubscribe();
        this.closeWindow();
        })
      }

  }

  public closeWindow(){
    this.closeEdit.emit("close");
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

  public submit(){
    this.updateInstructor();
  }

  public add(){
    this.addInstructor();
  }
}
