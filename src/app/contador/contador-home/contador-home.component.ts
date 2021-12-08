import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contador-home',
  templateUrl: './contador-home.component.html',
  styleUrls: ['./contador-home.component.css']
})
export class ContadorHomeComponent implements OnInit {
  datap = JSON.parse(localStorage.getItem('usuariobd') || '{}');
  constructor() { }

  ngOnInit(): void {
  }

}
