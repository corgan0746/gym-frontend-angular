import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public isValidField(form: FormGroup ,field: string): boolean | null{
    return form.controls[field].errors && form.controls[field].touched;
  }

  public isFieldOneEqualToFieldTwo(field1: string, field2: string){

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if(fieldValue1 !== fieldValue2){
        formGroup.get(field2)?.setErrors({notEqual: true});
        return {notEqual: true}
      }

      formGroup.get(field2)?.setErrors(null);

      return null;

    }

  }

  public errorTranslator(field: string, err:ValidationErrors| null): string{
    if(err === null){
      return "";
    }
    const errKey = Object.keys(err);
    if(errKey[0] === "minlength"){
      return `${field} must have at least ${err['minlength']['requiredLength'].toString()} characters`
    }
    if(errKey[0] === "maxlength"){
      return `${field} must have less than ${err['maxlength']['requiredLength'].toString()} characters`
    }
    if(errKey[0] === "required"){
      return `${field} is required`
    }
    if(errKey[0] === "pattern"){
      return `${field} must be a ${field}`
    }
    return "";
  }

}
