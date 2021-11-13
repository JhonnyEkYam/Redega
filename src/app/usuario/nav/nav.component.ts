import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/shared/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router:Router,
    public userService: UserService) { }

  ngOnInit(): void {
  }
  goToHome(){
    this.router.navigate(['usuario/home']);
  }
  goToProfile(){
    this.router.navigate(['usuario/profile']);
  }
  goToOutcomes(){
    this.router.navigate(['usuario/gastos']);
  }

  closeSession(){
    this.userService.logout();
  }
}
