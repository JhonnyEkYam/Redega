import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { EditIncomeComponent } from './edit-income/edit-income.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crud-incomes',
  templateUrl: './crud-incomes.component.html',
  styleUrls: ['./crud-incomes.component.css']
})
export class CrudIncomesComponent implements OnInit {
  // Conexion a Firebase
  private store: AngularFirestore;
  // Lista de observablles
  incomes: Observable<any[]>;
  incomesThisYear: Observable<any[]>;
  // Otros
  total: number = 0; // Monto total del mes seleccionado
  totalYearlyActiveIncomes = 0; // Todos los ingresos del año
  today = new Date(); // Fecha actual
  month = new Date().getMonth(); // Mes actual
  selectedMonth = this.month; // Mes seleccionado de la lista de meses
  monthsData; // Lista de meses en esañol

  constructor(public dialog: MatDialog, store: AngularFirestore, private storage: AngularFireStorage, public router: Router) {
    this.store = store;


    let monthYearValue = Number(
      this.getCurrentYear()
      + '' + ((Number(this.month) + 1) < 10 ? '0' : '') + '' +
      (Number(this.month) + 1)
    );
    // this.statusOutcomesView = this.statusOutcomesView > 0 ? 0 : 1;
    this.incomes = this.store.collection('incomes', ref => ref
      .where('monthYear', '==', monthYearValue)
      .orderBy('date_income', 'desc'))
      .valueChanges({
        idField: 'id',
      });
    this.setTotal();

    // Obtener todos los gastos del año actual
    let incomesThisYear = this.store.collection('incomes', ref => ref
      .where('monthYear', '>=', Number(this.getCurrentYear() + '00'))
      .where('monthYear', '<', Number((Number(this.getCurrentYear()) + 1) + '00'))
    ).valueChanges();
    this.incomesThisYear = incomesThisYear;
    this.monthsData = this.getMonths()
  }
  ngOnInit() {
    this.getTotalYearlyActiveIncomes()
  }

  setTotal() {
    console.log("1>", this.total)
    this.incomes.forEach((incomes: any[]) => {
      this.total = 0;
      incomes.forEach(income => {
        console.log("2>", this.total)
        this.total += Number(income.amount);
      })
    })
    console.log("3>", this.total)
  }

  showEditDialog(income: any): void {
    const dialogRef = this.dialog.open(EditIncomeComponent, {
      width: '600px'
    });
    let validLog = false;
    dialogRef.componentInstance.editedIncome = income;
    dialogRef.beforeClosed().subscribe(editedIncome => {
      validLog = !isNaN(editedIncome.amount) && (editedIncome.amount > 0)
    })
    dialogRef.afterClosed().subscribe(editedIncome => {
      if (validLog) {
        let incomeYear, incomeMonth;
        let monthYearValue;
        try {
          incomeYear = editedIncome.date_income.toDate().getFullYear()
          incomeMonth = editedIncome.date_income.toDate().getMonth() + 1
        } catch (err) {
          incomeYear = editedIncome.date_income.getFullYear()
          incomeMonth = editedIncome.date_income.getMonth() + 1
        }

        monthYearValue = Number(
          Number(incomeYear) + '' + (Number(incomeMonth) < 10 ? '0' : '') + '' + (Number(incomeMonth))
        )

        const updatedDoc = this.store.collection('incomes'); // Almacena el registro
        updatedDoc.doc(editedIncome.id).update({
          amount: Number(editedIncome.amount),
          date_income: editedIncome.date_income,
          date_update: new Date(),
          monthYear: Number(monthYearValue),
        });

      } else {
        this.incomes = this.store.collection('incomes').valueChanges({
          idField: 'id',
        });
      }
      this.setTotal();
    });
  }

  deleteLog(idIncome: string): void {
    const updatedDoc = this.store.collection('incomes');
    updatedDoc.doc(idIncome).delete().then(() => {
      console.log("Exito");
      this.setTotal();
    })
      .catch(err => {
        console.log("Error: ", err);
      });
  }

  public printDate(dateOrTimestamps: any): any {
    if (dateOrTimestamps.seconds) return new Date(dateOrTimestamps.seconds * 1000).toDateString();
    return dateOrTimestamps.toDateString();
  }

  public isFilled() {
    return this.total > 0;
  }

  public getMonths() {
    let months = [];
    for (let i = 0; i <= this.month; i++) {
      months.push(this.getMonth(i))
    }
    // debugger
    return months;
  }

  public getCurrentYear() {
    return this.today.getFullYear();
  }

  private getTotalYearlyActiveIncomes() {
    this.incomesThisYear.forEach((incomes: any[]) => {
      try {
        if (incomes[0].status == 1) {
          // debugger
          this.totalYearlyActiveIncomes = 0;
          incomes.forEach(income => {
            debugger
            this.totalYearlyActiveIncomes += Number(income.amount);
          })
          // debugger
          return;
        }
      } catch (err) {
        this.totalYearlyActiveIncomes = 0;
        debugger
      }
      return;
    })
  }

  public setView(indexMonth: any) {
    this.selectedMonth = indexMonth;
    console.log("indexMonth>", indexMonth)
    let idMonth = Number(
      this.getCurrentYear()
      + '' + ((Number(indexMonth) + 1) < 10 ? '0' : '') + '' +
      (Number(indexMonth) + 1)
    );
    // this.statusOutcomesView = this.statusOutcomesView > 0 ? 0 : 1;
    this.incomes = this.store.collection('incomes', ref => ref
      .where('monthYear', '==', idMonth)
      .orderBy('date_income', 'desc'))
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
