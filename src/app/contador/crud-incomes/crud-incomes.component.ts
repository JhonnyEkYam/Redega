import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatDialog } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { EditIncomeComponent } from './edit-income/edit-income.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-incomes',
  templateUrl: './crud-incomes.component.html',
  styleUrls: ['./crud-incomes.component.css']
})
export class CrudIncomesComponent implements OnInit {
  
  incomes: any;
  private store: AngularFirestore;
  total:number = 0;

  constructor(public dialog: MatDialog, store: AngularFirestore, private storage: AngularFireStorage, public router:Router) {
    this.store = store;
    this.incomes = this.store.collection('incomes').valueChanges({
      idField: 'id',
    });
    this.setTotal();    
  }
  ngOnInit() {}

  setTotal(){
      this.incomes.forEach((incomes: any[]) => {
          this.total=0;
          incomes.forEach(income=>{
            this.total += Number(income.amount);
          })
      })
  }

  showEditDialog(income: any): void {
    const dialogRef = this.dialog.open(EditIncomeComponent, {
      width: '600px'
    });
    let validLog = false;
    dialogRef.componentInstance.editedIncome = income;
    dialogRef.beforeClosed().subscribe(editedIncome =>{
      validLog = !isNaN(editedIncome.amount) && (editedIncome.amount > 0)
    })
    dialogRef.afterClosed().subscribe(editedIncome => {
      if(validLog){
        const updatedDoc = this.store.collection('incomes');
        updatedDoc.doc(editedIncome.id).update({
          amount: Number(editedIncome.amount),
          date_income: editedIncome.date_income,
          date_update: new Date(),
        });
      }else{
        this.incomes = this.store.collection('incomes').valueChanges({
          idField: 'id',
        });
      }
      this.setTotal();
    });
  }

  deleteLog(idIncome: string): void {
    const updatedDoc = this.store.collection('incomes');
    updatedDoc.doc(idIncome).delete().then(()=>{
      console.log("Exito");
      this.setTotal();
    })
    .catch(err=>{
      console.log("Error: ", err);
    });
  }

  public printDate(dateOrTimestamps: any): any {
    if (dateOrTimestamps.seconds) return new Date(dateOrTimestamps.seconds * 1000).toDateString();
    return dateOrTimestamps.toDateString();
  }

}
