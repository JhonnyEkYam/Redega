import { Observable, Timestamp } from "rxjs";
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { NewOutcomeComponent } from "./new-outcome/new-outcome.component";
import { MatDialog } from '@angular/material/dialog';
import { EditOutcomeComponent } from "./edit-outcome/edit-outcome.component";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})

export class TestingComponent implements OnInit {
  activeOutcomes: Observable<any[]>;
  inactiveOutcomes: Observable<any[]>;
  outcomes: any;
  private store: AngularFirestore;
  private statusOutcomesView = 1;
  total:number = 0;

  constructor(public dialog: MatDialog, store: AngularFirestore) {
    this.store = store;
    this.activeOutcomes = this.store.collection('outcomes', ref=>ref.where('status', '==', 1)).valueChanges({
      idField: 'id',
    });
    this.inactiveOutcomes =  this.store.collection('outcomes', ref=>ref.where('status', '==', 0)).valueChanges({
      idField: 'id',
    });
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
  showCreateDialog(): void {
    const dialogRef = this.dialog.open(NewOutcomeComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(newOutcome => {
      newOutcome.date_log = new Date();
      newOutcome.date_update = new Date();
      newOutcome.photo = 'default.jpg';
      newOutcome.status = Number(1);
      this.store.collection('outcomes').add(newOutcome);
      this.setView()
    });
  }

  showEditDialog(outcome: any): void {
    const dialogRef = this.dialog.open(EditOutcomeComponent, {
      width: '600px'
    });
    dialogRef.componentInstance.editedOutcome = outcome;
    dialogRef.afterClosed().subscribe(editedOutcome => {
      const updatedDoc = this.store.collection('outcomes');
      updatedDoc.doc(editedOutcome.id).update({
        amount: editedOutcome.amount,
        concept: editedOutcome.concept,
        date_outcome: editedOutcome.date_outcome,
        date_update: new Date(),
        photo: editedOutcome.photo
      });
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
