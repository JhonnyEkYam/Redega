import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '@app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  dataemail = new FormControl('', [Validators.required, Validators.email]);
  datapassword = new FormControl('', [Validators.required, Validators.minLength(4)]);
  hide = true;

  constructor(
    public userService: UserService
    ){}
    
  getErrorMessage() {
    if (this.dataemail.hasError('required')) {
      return 'You must enter a value';
    }

    return this.dataemail.hasError('email') ? 'Not a valid email' : '';
  }/*
  loginwithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }*/
  login(){
    this.userService.login(this.dataemail.value, this.datapassword.value);
  } 
  
}
