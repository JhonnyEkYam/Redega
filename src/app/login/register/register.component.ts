import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '@app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  dataemail = new FormControl('', [Validators.required, Validators.email]);
  datapassword = new FormControl('', [Validators.required, Validators.minLength(4)]);
  datapassword1 = new FormControl('', [Validators.required, Validators.minLength(4)]);
  hide = true;
  hide1 = true;
  hide_spin = true;
  true = true;
  constructor(
    public userService: UserService) { }
    
  getErrorMessage() {
    if (this.dataemail.hasError('required')) {
      return 'You must enter a value';
    }
    return this.dataemail.hasError('email') ? 'Not a valid email' : '';
  }
  checkpassword() {
    if (this.datapassword.value === this.datapassword1.value) {
      return true;
    } else {
      return false;
    }
  }

  registro(){
    if (this.checkpassword() == true) {
      this.hide_spin = false;
      this.userService.register(this.dataemail.value, this.datapassword.value);
    } else {
      //Agregar cuadro para mostrar error
      alert('Error en los datos');
      this.hide_spin = true;
    }
    
  }
}