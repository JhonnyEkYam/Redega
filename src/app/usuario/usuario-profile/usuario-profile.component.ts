import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-usuario-profile',
  templateUrl: './usuario-profile.component.html',
  styleUrls: ['./usuario-profile.component.css']
})
export class UsuarioProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  hide1 = true;
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
