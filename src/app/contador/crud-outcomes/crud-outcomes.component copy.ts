import { Observable } from "rxjs";
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatDialog } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/compat/storage';
//
import { EditOutcomeCComponent } from './edit-outcome-c/edit-outcome-c.component';
//
import { query, orderBy, limit, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";


@Component({
  selector: 'app-crud-outcomes',
  templateUrl: './crud-outcomes.component.html',
  styleUrls: ['./crud-outcomes.component.css']
})
export class CrudOutcomesComponent implements OnInit {
  activeOutcomes: Observable<any[]>;
  inactiveOutcomes: Observable<any[]>;
  outcomes: any;
  private store: AngularFirestore;
  private statusOutcomesView = 1;
  total:number = 0;

  constructor(public dialog: MatDialog, store: AngularFirestore, private storage: AngularFireStorage) {
    this.store = store
    this.activeOutcomes = this.store.collection('outcomes', ref=>ref.where('status', '==', 1).orderBy('date_outcome', 'desc')).valueChanges({
      idField: 'id',
    });
    this.inactiveOutcomes =  this.store.collection('outcomes', ref=>ref.where('status', '==', 0).orderBy('date_outcome', 'desc')).valueChanges({
      idField: 'id',
    });
    this.statusOutcomesView = 1;
    this.outcomes = this.activeOutcomes;
    this.setTotal();
  }

  ngOnInit() {}

  setTotal(){
      this.outcomes.forEach((outcomes: any[]) => {
        if(outcomes[0].status == this.statusOutcomesView){
          this.total=0;
          outcomes.forEach(outcome=>{
            this.total += Number(outcome.amount);
          })
          return;  
        }
      })
  }

  setView() {
    this.activeOutcomes = this.store.collection('outcomes', ref=>ref.where('status', '==', 1)).valueChanges({
      idField: 'id',
    });
    this.inactiveOutcomes =  this.store.collection('outcomes', ref=>ref.where('status', '==', 0)).valueChanges({
      idField: 'id',
    });
    this.outcomes = (this.statusOutcomesView > 0) ? this.activeOutcomes : this.inactiveOutcomes;
    this.setTotal();
  }

  showEditDialog(outcome: any): void {
    const dialogRef = this.dialog.open(EditOutcomeCComponent, {
      width: '600px'
    });
    let validLog = false;
    dialogRef.componentInstance.editedOutcome = outcome;
    dialogRef.afterClosed().subscribe(editedOutcome => {
      if(editedOutcome.amount.toString().length>0){
        validLog = !isNaN(Number(editedOutcome.amount)) && (Number(editedOutcome.amount) > 0)
      }
      if(editedOutcome.concept.toString().length<4 && validLog){
        validLog = false;
      }
      if(editedOutcome.date_outcome.toString().length<1 && validLog){
        validLog = false;
      }
      if(validLog){  
        let outcomeYear, outcomeMonth;
        let monthYearValue;
        try{
          outcomeYear = editedOutcome.date_outcome.toDate().getFullYear()
          outcomeMonth = editedOutcome.date_outcome.toDate().getMonth() + 1
        }catch(err){
          outcomeYear = editedOutcome.date_outcome.getFullYear()
          outcomeMonth = editedOutcome.date_outcome.getMonth() + 1
        }
        
        monthYearValue = Number(
          Number(outcomeYear) + '' + (Number(outcomeMonth)<10?'0':'') + '' + (Number(outcomeMonth))
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
      }else{
        console.log("egreso no editado debido a inconsistencias")
      }
      this.setView();
    });
  }

  deleteLog(idOutcome: string, statusLog: number): void {
    const updatedDoc = this.store.collection('outcomes');
    updatedDoc.doc(idOutcome).update({
      status: Number(statusLog>0?0:1)
    });
    this.setTotal();
  }

  shiftOutcomesView(){
    this.statusOutcomesView = this.statusOutcomesView>0 ? 0: 1;
    this.setView();
  }

  public printDate(dateOrTimestamps: any): any {
    if (dateOrTimestamps.seconds) return new Date(dateOrTimestamps.seconds * 1000).toDateString();
    return dateOrTimestamps.toDateString();
  }
}
