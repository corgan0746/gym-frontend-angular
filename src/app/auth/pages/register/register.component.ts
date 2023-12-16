import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/share/service/validators.service';
import { FieldsErrors } from '../../interfaces/FieldsErrors';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private validatorService = inject(ValidatorsService);

  private formSubscription?:Subscription;

  public registerForm: FormGroup = this.fb.group({
    email:['adsa@hotmail.com', [Validators.required, Validators.maxLength(30), Validators.minLength(10), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password:['Nonononn2!', [Validators.required, Validators.maxLength(64), Validators.minLength(7)]],
    confirmPassword:['Nonononn2!', [Validators.required, Validators.maxLength(64), Validators.minLength(7)]],
    firstName:['momo', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
    lastName:['bobos', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
    phone:['45435436432', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(11), Validators.minLength(11)]],
    postcode:['nw105gg', [Validators.required, Validators.maxLength(7), Validators.minLength(6)]],
    address:['123 adfsadsa', [Validators.required, Validators.maxLength(45), Validators.minLength(6)]],
    country:['united', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
    city:['bristol', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
    terms:[true, [Validators.requiredTrue]]
  },{
    validators:[
      this.validatorService.isFieldOneEqualToFieldTwo('password', 'confirmPassword')
    ]
  }
  )

  ngOnInit(){
    this.formSubscription = this.registerForm.valueChanges.subscribe((action) => {
      this.searchErrors();
    }
    );
  }


  public fieldsErrors:FieldsErrors = {
    firstName:"",
    lastName: "",
    password: "",
    confirmPassword: "",
    postcode: "",
    phone: "",
    address: "",
    email: "",
    country:"",
    city:"",
    term:""
  }

  public searchErrors(){
    this.fieldsErrors.firstName = this.errorTranslate("firstName");
    this.fieldsErrors.lastName = this.errorTranslate("lastName");
    this.fieldsErrors.email = this.errorTranslate("email");
    this.fieldsErrors.password = this.errorTranslate("password");
    this.fieldsErrors.confirmPassword = this.errorTranslate("confirmPassword");
    this.fieldsErrors.phone = this.errorTranslate("phone");
    this.fieldsErrors.postcode = this.errorTranslate("postcode");
    this.fieldsErrors.address = this.errorTranslate("address");
    this.fieldsErrors.country = this.errorTranslate("country");
    this.fieldsErrors.city = this.errorTranslate("city");
    this.fieldsErrors.term = this.errorTranslate("term")
  }

  public acceptTerms:boolean = false;

  public checkField(form: FormGroup ,field: string): boolean | null{
    return this.validatorService.isValidField(form, field)
  }

  public errorTranslate(field: string):string{
    if(this.registerForm.controls[field]?.errors != null){
      const res = this.validatorService.errorTranslator(field, this.registerForm.controls[field].errors);
      return res;
    }
    return "";
  }

  public submit(e:any){

    this.registerForm.markAllAsTouched();
    if(this.registerForm.invalid){
      this.searchErrors();
      return;
    }
    const {confirmPassword, terms, ...rest } = this.registerForm.value;
    this.authService.registerUser(rest);

  }

  public actualSendToken(){
    this.authService.actualAuthenticate();
  }

  public getProducts(){
    this.authService.getProducts();
  }

  public get errorMessage(){
    return this.authService.getErrorMessage;
  }

  public get isError(){
    return this.authService.getIsAuthError();
  }

  ngOnDestroy(){
    this.formSubscription?.unsubscribe();
  }

}
