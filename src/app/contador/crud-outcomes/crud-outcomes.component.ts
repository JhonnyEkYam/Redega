import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatDialog } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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
  outcomes: Observable<any[]>;
  private store: AngularFirestore;
  statusOutcomesView = 1;
  total: number = 0;
  today = new Date();
  month = new Date().getMonth();

  constructor(public dialog: MatDialog, store: AngularFirestore, private storage: AngularFireStorage) {
    
    // Obtener ID AÑOFECHA 
    let monthYear = Number(
      this.today.getFullYear() + '' + (Number(this.today.getMonth())+1)
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
  }

  ngOnInit() { }

  setTotal() {
    this.outcomes.forEach((outcomes: any[]) => {
      if (outcomes[0].status == this.statusOutcomesView) {
        this.total = 0;
        outcomes.forEach(outcome => {
          this.total += Number(outcome.amount);
        })
        return;
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
    this.statusOutcomesView = this.statusOutcomesView > 0 ? 0 : 1;
    this.outcomes = this.store.collection('outcomes', ref => ref.where('status', '==', this.statusOutcomesView).where('monthYear', '==', 202111).orderBy('date_outcome', 'desc')).valueChanges({
      idField: 'id',
    });
    this.setTotal();
  }

  public printDate(dateOrTimestamps: any): any {
    if (dateOrTimestamps.seconds) return new Date(dateOrTimestamps.seconds * 1000).toDateString();
    return dateOrTimestamps.toDateString();
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
