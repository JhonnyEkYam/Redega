import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contador-incomes',
  templateUrl: './contador-incomes.component.html',
  styleUrls: ['./contador-incomes.component.css']
})
export class ContadorIncomesComponent implements OnInit {
  datap = JSON.parse(localStorage.getItem('usuariobd') || '{}');
  constructor() { }

  ngOnInit(): void {
  }

}
