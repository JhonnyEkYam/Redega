import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/shared/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-usuario-home',
  templateUrl: './usuario-home.component.html',
  styleUrls: ['./usuario-home.component.css']
})
export class UsuarioHomeComponent implements OnInit {

  constructor(private router:Router,
    public userService: UserService,
    public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.userService.userinfo();
  }

  goToOutcomes(){
    this.router.navigate(['/usuario/gastos']);
  }
  /*getuser(){
    this.userService.userinfo();
  }*/

}
