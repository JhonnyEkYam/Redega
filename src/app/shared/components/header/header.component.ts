import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from '@app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user1:any;
  a=false;

  constructor(private router:Router, private userService: UserService,public auth1: AngularFireAuth,) { }
  

  ngOnInit(): void {
    this.checkrole();
  }

  /** Cargar vistas */
  goToRegister(){
    this.router.navigate(['register']);
  }
  goToLogin(){
    this.router.navigate(['']);
  }
  logout(){
    this.userService.logout();
  }
  checkrole(){
    this.user1 = JSON.parse(localStorage.getItem('usuariobd') || '{}');
    if(this.auth1.user){
      setTimeout(() => {
        this.a=true;
        this.ngOnInit();
      }, 1000);
      
      
    }
  }

}

