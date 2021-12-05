import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatDialog } from '@angular/material/dialog';
//
import { EditOutcomeCComponent } from './edit-outcome-c/edit-outcome-c.component';
//
import { Observable } from 'rxjs';


@Component({
  selector: 'app-crud-outcomes',
  templateUrl: './crud-outcomes.component.html',
  styleUrls: ['./crud-outcomes.component.css']
})
export class CrudOutcomesComponent implements OnInit {
  // Conexion a Firebase
  private store: AngularFirestore;
  // Observables Outcomes
  outcomes: Observable<any[]>;
  outcomesThisYear: Observable<any[]>;
  // Otras
  totalYearlyActiveOutcomes = 0;
  statusOutcomesView = 1;// Tipo de egresos
  total: number = 0; // Monto mensual del mes seleccionado
  today = new Date(); // Fecha actual
  month = new Date().getMonth(); // Mes actual
  selectedMonth = this.month; // Mes seleccionado de la lista de meses
  monthsData;

  constructor(public dialog: MatDialog, store: AngularFirestore) {

    // Obtener ID AÑOFECHA 
    let monthYear = Number(
      this.today.getFullYear()   
       + '' + ((Number(this.today.getMonth()) + 1) < 10 ? '0' : '') + '' +     
       (Number(this.today.getMonth())+1)
    );
    // Conexion a Firestore
    this.store = store
    // Tipo de egresos a buscar, ACTIVOS
    this.statusOutcomesView = 1;
    // Peticion de los gastos del mes ACTUAL
    this.outcomes = this.store.collection('outcomes', ref => ref.where('status', '==', this.statusOutcomesView).where('monthYear', '==', monthYear).orderBy('date_outcome', 'desc')).valueChanges({
      idField: 'id',
    });
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

  setTotal() {
    this.outcomes.forEach((outcomes: any[]) => {
      try {
        if (outcomes[0].status == this.statusOutcomesView) {
          this.total = 0;
          outcomes.forEach(outcome => {
            this.total += Number(outcome.amount);
          })
          return;
        }
      } catch (err) {
        this.total = 0;
        // debugger
      }
    })
  }

  showEditDialog(outcome: any): void {
    const dialogRef = this.dialog.open(EditOutcomeCComponent, {
      width: '600px'
    });
    let validLog = false;
    dialogRef.componentInstance.editedOutcome = outcome;
    dialogRef.afterClosed().subscribe(editedOutcome => {
      if (editedOutcome.amount.toString().length > 0) {
        validLog = !isNaN(Number(editedOutcome.amount)) && (Number(editedOutcome.amount) > 0)
      }
      if (editedOutcome.concept.toString().length < 4 && validLog) {
        validLog = false;
      }
      if (editedOutcome.date_outcome.toString().length < 1 && validLog) {
        validLog = false;
      }
      if (validLog) {
        let outcomeYear, outcomeMonth;
        let monthYearValue;
        try {
          outcomeYear = editedOutcome.date_outcome.toDate().getFullYear()
          outcomeMonth = editedOutcome.date_outcome.toDate().getMonth() + 1
        } catch (err) {
          outcomeYear = editedOutcome.date_outcome.getFullYear()
          outcomeMonth = editedOutcome.date_outcome.getMonth() + 1
        }

        monthYearValue = Number(
          Number(outcomeYear) + '' + (Number(outcomeMonth) < 10 ? '0' : '') + '' + (Number(outcomeMonth))
        )

        const updatedDoc = this.store.collection('outcomes');
        updatedDoc.doc(editedOutcome.id).update({
          amount: Number(editedOutcome.amount),
          concept: editedOutcome.concept,
          date_outcome: editedOutcome.date_outcome,
          date_update: new Date(),
          monthYear: Number(monthYearValue),
          photo: editedOutcome.photo
        });
      } else {
        console.log("egreso no editado debido a inconsistencias")
      }
      this.setTotal();
    });
  }

  deleteLog(idOutcome: string, statusLog: number): void {
    const updatedDoc = this.store.collection('outcomes');
    updatedDoc.doc(idOutcome).update({
      status: Number(statusLog > 0 ? 0 : 1)
    });
    this.setTotal();
  }

  shiftOutcomesView() {
    let monthYear = Number(
      this.today.getFullYear()   
       + '' + ((Number(this.selectedMonth) + 1) < 10 ? '0' : '') + '' +     
       (Number(this.selectedMonth)+1)
    );
    this.statusOutcomesView = this.statusOutcomesView > 0 ? 0 : 1;
    this.outcomes = this.store.collection('outcomes', ref => ref
      .where('status', '==', this.statusOutcomesView)
      .where('monthYear', '==', monthYear)
      .orderBy('date_outcome', 'desc')).valueChanges({
      idField: 'id',
    });
    this.setTotal();
  }

  public printDate(dateOrTimestamps: any): any {
    if (dateOrTimestamps.seconds) return new Date(dateOrTimestamps.seconds * 1000).toDateString();
    return dateOrTimestamps.toDateString();
  }

  public getCurrentMonthInSpanish() {
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
        debugger
      }
      return;
    })
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
      .where('status', '==', this.statusOutcomesView)
      .where('monthYear', '==', idMonth)
      .orderBy('date_outcome', 'desc'))
      .valueChanges({
        idField: 'id',
      });
    this.setTotal();
  }

  public isFilled(){
    return this.total > 0;
  }
}
