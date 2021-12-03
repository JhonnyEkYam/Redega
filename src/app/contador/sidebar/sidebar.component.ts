import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatDialog } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { CreateOutcomeComponent } from '../crud-outcomes/create-outcome/create-outcome.component';
import { CreateIncomeComponent } from '../crud-outcomes/create-income/create-income.component';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private store: AngularFirestore;

  constructor(public router: Router,public dialog: MatDialog, store: AngularFirestore, private storage: AngularFireStorage) { 
    this.store = store;
  }

  ngOnInit(): void {
  }

  showCreateOutcomeDialog(): void {
    const dialogRef = this.dialog.open(CreateOutcomeComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(newOutcome => {
      if(!isNaN(Number(newOutcome.amount)) 
      && (Number(newOutcome.amount) > 0) 
      && newOutcome.date_outcome.toString().length > 1
      && newOutcome.photo.toString().length > 7){
        
        let monthYearValue = Number(
          newOutcome.date_outcome.getFullYear()   
           + '' + ((Number(newOutcome.date_outcome.getMoth()) + 1) < 10 ? '0' : '') + '' +     
           (Number(newOutcome.date_outcome.getMonth())+1)
        );

          newOutcome.date_log = new Date();
          newOutcome.date_update = new Date();
          newOutcome.status = Number(1);
          newOutcome.monthYear = Number(monthYearValue);
          newOutcome.amount = Number(newOutcome.amount);
          this.store.collection('outcomes').add(newOutcome);
      }else{
        console.log("Egreso no registrado debido a errores")
      }
    });
  }

  showCreateIncomeDialog(): void {
    const dialogRef = this.dialog.open(CreateIncomeComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(newIncome => {
      if(!isNaN(Number(newIncome.amount)) && (Number(newIncome.amount) > 0) && newIncome.date_income.toString().length > 1){
          newIncome.date_log = new Date();
          newIncome.date_update = new Date();
          newIncome.amount = Number(newIncome.amount);
          this.store.collection('incomes').add(newIncome);
      }else{
        console.log("Ingreso no registrado debido a errores")
      }
    });
  }


  // Rutas
  goToHome(){
    this.router.navigate(['contador/home']);
  }
  goToProfile(){
    this.router.navigate(['contador/profile']);
  }
  goToIncomes(){
    this.router.navigate(['contador/ingresos']);
  }
}
