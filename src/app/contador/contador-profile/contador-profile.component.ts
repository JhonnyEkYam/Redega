import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contador-profile',
  templateUrl: './contador-profile.component.html',
  styleUrls: ['./contador-profile.component.css']
})
export class ContadorProfileComponent implements OnInit {
  datap = JSON.parse(localStorage.getItem('usuariobd') || '{}');
  constructor() { }

  ngOnInit(): void {
  }

}
