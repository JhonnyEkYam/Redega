import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
//
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuario-outcomes',
  templateUrl: './usuario-outcomes.component.html',
  styleUrls: ['./usuario-outcomes.component.css']
})
export class UsuarioOutcomesComponent implements OnInit {
  // Conexion a Firebase
  private store: AngularFirestore;
  // Observables Outcomes
  outcomes: Observable<any[]>;
  outcomesThisYear: Observable<any[]>;
  // Otras
  totalYearlyActiveOutcomes = 0;
  total: number = 0; // Monto mensual del mes seleccionado
  today = new Date(); // Fecha actual
  month = new Date().getMonth(); // Mes actual
  selectedMonth = this.month; // Mes seleccionado de la lista de meses
  monthsData;

  constructor( store: AngularFirestore) {

    // Obtener ID AÑOFECHA 
    let monthYear = Number(
      this.today.getFullYear()   
       + '' + ((Number(this.today.getMonth()) + 1) < 10 ? '0' : '') + '' +     
       (Number(this.today.getMonth())+1)
    );
    // Conexion a Firestore
    this.store = store
    // Peticion de los gastos del mes ACTUAL
    this.outcomes = this.store.collection('outcomes', ref => ref
      .where('status', '==', 1)
      .where('monthYear', '==', monthYear)
      .orderBy('date_outcome', 'desc')).valueChanges();
    // Sumar los gastos del mes
    this.setTotal();

    // Obtener todos los gastos del año actual
    let outcomesThisYear = this.store.collection('outcomes', ref => ref
      .where('status', '==', 1)
      .where('monthYear', '>=', Number(this.getCurrentYear() + '00'))
      .where('monthYear', '<', Number((Number(this.getCurrentYear()) + 1) + '00'))
    ).valueChanges();
    // debugger
    this.outcomesThisYear = outcomesThisYear
    // debugger
    this.monthsData = this.getMonths()
  }

  ngOnInit() {
    this.getTotalYearlyActiveOutcomes()
  }


  private getTotalYearlyActiveOutcomes() {
    this.outcomesThisYear.forEach((outcomes: any[]) => {
      try {
        if (outcomes[0].status == 1) {
          // debugger
          this.totalYearlyActiveOutcomes = 0;
          outcomes.forEach(outcome => {
            this.totalYearlyActiveOutcomes += Number(outcome.amount);
          })
          // debugger
          return;
        }
      } catch (err) {
        this.totalYearlyActiveOutcomes = 0;
        // debugger
      }
      return;
    })
  }

  setTotal() {
    this.outcomes.forEach((outcomes: any[]) => {
      try {
        if (outcomes[0].status == 1) {
          this.total = 0;
          outcomes.forEach(outcome => {
            this.total += Number(outcome.amount);
          })
          return;
        }
      } catch (err) {
        this.total = 0;
      }
    })
  }
  
  public getCurrentYear() {
    return this.today.getFullYear();
  }

  public getMonths() {
    let months = [];
    for (let i = 0; i <= this.month; i++) {
      months.push(this.getMonth(i))
    }
    // debugger
    return months;
  }
  

  public printDate(dateOrTimestamps: any): any {
    try{
      if (dateOrTimestamps.seconds) return new Date(dateOrTimestamps.seconds * 1000).toDateString();
      return dateOrTimestamps.toDateString();
    }catch(err){
      return dateOrTimestamps.toDateString();
    }
  }

  

  public isFilled(){
    return this.total > 0;
  }

  
  public setView(indexMonth: any) {
    this.selectedMonth = indexMonth;
    let idMonth = Number(
      this.getCurrentYear()
      + '' + ((Number(indexMonth) + 1) < 10 ? '0' : '') + '' +
      (Number(indexMonth) + 1)
    );
    // this.statusOutcomesView = this.statusOutcomesView > 0 ? 0 : 1;
    this.outcomes = this.store.collection('outcomes', ref => ref
      .where('status', '==', 1)
      .where('monthYear', '==', idMonth)
      .orderBy('date_outcome', 'desc'))
      .valueChanges({
        idField: 'id',
      });
    this.setTotal();
  }


  public getMonth(monthIndex: number) {
    let month;

    // Obtener month
    switch (monthIndex) {
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
        month = 'Invalido';
        break;
    }

    return month;
  }
}
