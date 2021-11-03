import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario-profile',
  templateUrl: './usuario-profile.component.html',
  styleUrls: ['./usuario-profile.component.css']
})
export class UsuarioProfileComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.email]);
  hide = true;
  hide1 = true;

  getErrorMessage() {
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  goToHome(){
    this.router.navigate(['usuario/home']);
  }
}
