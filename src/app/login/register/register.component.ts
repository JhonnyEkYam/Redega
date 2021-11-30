import { Component, OnInit } from '@angular/core';
import { FormControl, Validators,FormGroupDirective, NgForm } from '@angular/forms';
import { UserService } from '@app/shared/services/user.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  dataname = new FormControl('', [Validators.required, Validators.minLength(4)]);
  dataemail = new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]);
  datapassword = new FormControl('', [Validators.required, Validators.minLength(4)]);
  datapassword1 = new FormControl('', [Validators.required, Validators.minLength(4)]);

  matcher = new MyErrorStateMatcher();
  hide = true;
  hide1 = true;
  hide_spin = true;
  true = true;

  constructor(
    public userService: UserService,
    public _snackBar: MatSnackBar
    ) { }
    
  getErrorMessage() {
    if (this.dataemail.hasError('required')) {
      return 'You must enter a value';
    }
    return this.dataemail.hasError('email') ? 'Por favor ingrese un correo valido' : '';
  }
  getErrorMessagename() {
    if (this.dataname.hasError('required')) {
      return 'You must enter a value';
    }
    return this.dataname.hasError('name') ? 'Necesitas minimo 4 letras' : '';
  }
  checkpassword() {
    if (this.datapassword.value == this.datapassword1.value) {
      if (this.datapassword.value === '' || this.datapassword1.value === '') {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  registro(){
    this.hide_spin = false;
      if (this.dataname.status == 'VALID' && this.dataemail.status == 'VALID' && this.datapassword.status == 'VALID' && this.datapassword1.status == 'VALID') {
        try {
          this.userService.register(this.dataemail.value, this.datapassword.value, this.dataname.value) 
        } catch (error) {
          this.hide_spin = true;  
        }
      } else {
        this.hide_spin = true;
        this.openError('Revise los campos', 'X');
        this.getErrorMessage();
        this.getErrorMessagename();
      }
      
  }
  
  openError(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}