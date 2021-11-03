import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario-home',
  templateUrl: './usuario-home.component.html',
  styleUrls: ['./usuario-home.component.css']
})
export class UsuarioHomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToOutcomes(){
    this.router.navigate(['/usuario/gastos']);
  }

}
