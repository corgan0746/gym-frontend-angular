import { Component, inject } from '@angular/core';
import { Customer, FieldsErrorsShort } from '../../interfaces/customer.interface';
import { AccountService } from '../../service/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/share/service/validators.service';
import { GymService } from 'src/app/gym/service/gym.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {

  private accountService = inject(AccountService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private validatorService = inject(ValidatorsService);
  private gymService = inject(GymService)

  private baseUrl = environment.baseUrl;
  public awsBucket = environment.awsBucket;

  public customer?:Customer;
  public isEdit:boolean = false;

  public photoFile:File | null = null;

  public saveForm:FormGroup = this.fb.group({
    email:['', [Validators.required, Validators.maxLength(30), Validators.minLength(10), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    firstName:['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
    lastName:['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
    phone:['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(11), Validators.minLength(11)]],
  });

  public fieldsErrors:FieldsErrorsShort = {
    firstName:"",
    lastName: "",
    phone: "",
    email: "",
  }

  private formSubscription?:Subscription;

  ngOnInit(){
    this.getCustomer();

    this.formSubscription = this.saveForm.valueChanges.subscribe((action) => {
      this.searchErrors();
    }
    );
  }

  public getCustomer(){
    const subscription = this.accountService.getCustomerWithToken()
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        subscription.unsubscribe();
      },
      next:(res) => {
        if(res === null) return;
        this.customer = res;
        const {firstName, lastName, email, phone } = this.customer;
        this.saveForm.setValue({firstName, lastName, email, phone });
        subscription.unsubscribe();
      }
    })
  }

  public checkField(form: FormGroup ,field: string): boolean | null{
    return this.validatorService.isValidField(form, field)
  }

  public searchErrors(){
    this.fieldsErrors.firstName = this.errorTranslate("firstName");
    this.fieldsErrors.lastName = this.errorTranslate("lastName");
    this.fieldsErrors.email = this.errorTranslate("email");
    this.fieldsErrors.phone = this.errorTranslate("phone");
  }

  public errorTranslate(field: string):string{
    if(this.saveForm.controls[field]?.errors != null){
      const res = this.validatorService.errorTranslator(field, this.saveForm.controls[field].errors);
      return res;
    }
    return "";
  }

  public changeMode(){
    this.isEdit = !this.isEdit;
  }



  public async changePicture(e:any){
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
        console.log("corect format");
    }else{
        console.log("Image File not compatible");
    }

  }

  public uploadPhoto(){

      if(this.photoFile){
      const formData = new FormData();


      formData.append('file', this.photoFile);

      const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/profilePicture`, formData)
        .subscribe((res) => {
          this.photoFile = null;
          this.getCustomer();
          subscription.unsubscribe();
        })
      }

  }

  public submit(){
    this.saveForm.markAllAsTouched();
    if(this.saveForm.invalid){
      this.searchErrors();
      return;
    }

    const subscription = this.gymService.generatePostObservable(`${this.baseUrl}/api/changeDetails`, this.saveForm.value)
    .subscribe({
      error:(err: HttpErrorResponse)=> {
        subscription.unsubscribe();
      },
      next:(res) => {
        this.getCustomer();
        this.photoFile = null;
        subscription.unsubscribe();
        this.authService.logout();
    }
  })
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

  ngOnDestroy(){
    this.formSubscription?.unsubscribe();
  }

}
