import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from "rxjs";
//
import { query, orderBy, limit, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

import { MatDialog } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-budget-viewer',
  templateUrl: './budget-viewer.component.html',
  styleUrls: ['./budget-viewer.component.css']
})


export class BudgetViewerComponent {
  outcomes: Observable<any[]>;
  private store: AngularFirestore;
  statusOutcomesView = 1;
  total: number = 0;

  monthOutcomes = 0;
  
  amountOutcome = 0;
  amountIncome = 0;
  budget = this.amountIncome - this.amountOutcome;

  today = new Date();
  month = new Date().getMonth();

  constructor(store: AngularFirestore) {
    // Obtener ID AÑOFECHA 
    let today = new Date();
    let monthYear = Number(
      today.getFullYear() + '' + (Number(today.getMonth())+1)
    );
    // Conexion a Firestore
    this.store = store
    // Tipo de egresos, egresos activos
    this.statusOutcomesView = 1;
    // consulta de todos los egresos del mes ACTUAL
    this.outcomes = this.store.collection('outcomes', ref => ref.where('status', '==', this.statusOutcomesView).where('monthYear', '==', monthYear).orderBy('date_outcome', 'desc')).valueChanges();
    // Suma de gastos del mes
    this.outcomes.forEach((res) => {
      this.monthOutcomes = 0;
      res.forEach((outcome) => {
        this.monthOutcomes += outcome.amount
      })
    })

    // Dinero TOTAL disponible o 'budget'
    let collectionOutcomes: Observable<any[]> = this.store.collection('outcomes', ref => ref.where('status', '==', this.statusOutcomesView).orderBy('date_outcome', 'desc')).valueChanges();
    let collectionIncomes: Observable<any[]> = this.store.collection('incomes').valueChanges();
    // Suma de todos los gastos
    collectionOutcomes.forEach(res=>{
      this.amountOutcome = 0;
      res.forEach((outcome)=>{
        this.amountOutcome += Number(outcome.amount)
      })
      // Dinero disponible
      this.budget = this.amountIncome - this.amountOutcome
    })
    // Suma de todos los ingresos
    collectionIncomes.forEach(res=>{
      this.amountIncome = 0;
      res.forEach((income)=>{
        this.amountIncome += Number(income.amount)
      })
      // Dinero disponible
      this.budget = this.amountIncome -this.amountOutcome
    })
  }

  public getMonthInSpanish(){
    let month;
    switch (this.month) {
      case 0:
        month = 'Enero';
        break;
      case 1:
        month = 'Febrero';
        break;
      case 2:
        month = 'Marzo';
        break;
      case 3:
        month = 'Abril';
        break;
      case 4:
        month = 'Mayo';
        break;
      case 5:
        month = 'Junio';
        break;
      case 6:
        month = 'Julio';
        break;
      case 7:
        month = 'Agosto';
        break;
      case 8:
        month = 'Septiembre';
        break;
      case 9:
        month = 'Octubre';
        break;
      case 10:
        month = 'Noviembre';
        break;
      case 11:
        month = 'Diciembre';
        break;
      default:
        month = 'Esperando...';
        break;
    }
    return month;
  }

  public getCurrentYear(){
    return this.today.getFullYear();
  }
}

