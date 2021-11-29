import { Observable } from "rxjs";
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
      newOutcome.date_log = new Date();
      newOutcome.date_update = new Date();
      newOutcome.photo = newOutcome.photo;
      newOutcome.status = Number(1);
      this.store.collection('outcomes').add(newOutcome);
    });
  }

  showCreateIncomeDialog(): void {
    const dialogRef = this.dialog.open(CreateIncomeComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(newIncome => {
      newIncome.date_log = new Date();
      newIncome.date_update = new Date();
      newIncome.amount = Number(newIncome.amount);
      this.store.collection('incomes').add(newIncome);
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
