import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encargado-profile',
  templateUrl: './encargado-profile.component.html',
  styleUrls: ['./encargado-profile.component.css']
})
export class EncargadoProfileComponent implements OnInit {
  datap = JSON.parse(localStorage.getItem('usuariobd') || '{}');
  constructor() { }

  ngOnInit(): void {
  }

}
