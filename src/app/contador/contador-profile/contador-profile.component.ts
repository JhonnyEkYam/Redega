import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contador-profile',
  templateUrl: './contador-profile.component.html',
  styleUrls: ['./contador-profile.component.css']
})
export class ContadorProfileComponent implements OnInit {
  datap = JSON.parse(localStorage.getItem('usuariobd') || '{}');
  longText = `Por el momento no hay ningún contenido en esta sección. Porque no tiene acceso a esta sección.
  Si crees que esto es un error, por favor contacta con el administrador.`;
  constructor() { }

  ngOnInit(): void {
  }
  cerrar(){
    localStorage.removeItem('usuariobd');
    window.location.href = '/';
    }
    close(){
      localStorage.clear();
      window.location.href = '/';
    }

}
