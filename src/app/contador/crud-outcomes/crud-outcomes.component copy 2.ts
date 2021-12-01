import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatDialog } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/compat/storage';
//
import { EditOutcomeCComponent } from './edit-outcome-c/edit-outcome-c.component';
//
import { query, orderBy, limit, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-crud-outcomes',
  templateUrl: './crud-outcomes.component.html',
  styleUrls: ['./crud-outcomes.component.css']
})
export class CrudOutcomesComponent implements OnInit {
  outcomes: any;
  viewOutcomes!: Observable<any[]>;
  private store: AngularFirestore;
  statusOutcomesView = 1;
  total: number = 0;

  constructor(public dialog: MatDialog, store: AngularFirestore, private storage: AngularFireStorage) {
    this.statusOutcomesView = 1;
    const db = getFirestore();
    const outcomesRef = collection(db, 'outcomes');
    const q = query(outcomesRef, orderBy('date_outcome', 'desc'), limit(30), where('status', '==', this.statusOutcomesView));
    
    (async () => {
      try {
        this.outcomes = (await getDocs(q));
        debugger
        this.viewOutcomes = this.outcomes
        this.outcomes.forEach((outcome: any) => {
          console.log(outcome.data())
          // this.viewOutcomes.push(outcome.data())
          // debugger
        });
      } catch (e) {
        debugger
        console.log("Error adding document: ", e);
      }
      debugger
      this.setTotal();
    })()
    this.store = store;
    debugger
  }

  ngOnInit() { }

  setTotal() {
    debugger
    this.total = 0;
    this.outcomes.forEach((outcome: any) => {
      debugger
      if (outcome.data().status == this.statusOutcomesView) {
        debugger
        this.total += Number(outcome.data().amount);
        // outcomes.forEach(outcome => {
        //   debugger
        //   this.total += Number(outcome.data().amount);
        // })
        return;
      }
    })
  }

  setView() {
    // this.viewOutcomes = [];
    const db = getFirestore();
    const outcomesRef = collection(db, 'outcomes');
    const q = query(outcomesRef, orderBy('date_outcome', 'desc'), limit(30), where('status', '==', this.statusOutcomesView));
    (async () => {
      try {
        this.outcomes = (await getDocs(q)).docChanges();
        debugger
        this.viewOutcomes = this.outcomes
        // this.outcomes.forEach((outcome: any) => {
        //   this.viewOutcomes.push(outcome.data())
        //   // debugger
        // });
      } catch (e) {
        debugger
        console.log("Error adding document: ", e);
      }
      debugger
      this.setTotal();
    })()
    this.setTotal();
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
      this.setView();
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
    this.setView();
  }

  public printDate(dateOrTimestamps: any): any {
    if (dateOrTimestamps.seconds) return new Date(dateOrTimestamps.seconds * 1000).toDateString();
    return dateOrTimestamps.toDateString();
  }
}
