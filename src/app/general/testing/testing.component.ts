import {Observable, Timestamp} from "rxjs";
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {NewOutcomeComponent} from "./new-outcome/new-outcome.component";
import {MatDialog} from '@angular/material/dialog';
import { EditOutcomeComponent } from "./edit-outcome/edit-outcome.component";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  outcomes: Observable<any[]>;
  
  private store: AngularFirestore;

  constructor(public dialog: MatDialog, store: AngularFirestore) {
    this.store = store;
    this.outcomes = store.collection('outcomes').valueChanges({
      idField: 'id',
    });
    // this.outcomes.forEach(outcome => {
    //   console.log(outcome);
    // });
  }

  showCreateDialog(): void {
    const dialogRef = this.dialog.open(NewOutcomeComponent, {
      width: '600px'
    });
    
    dialogRef.afterClosed().subscribe(newOutcome => {
      newOutcome.date_log = new Date();
      newOutcome.date_update = new Date();
      newOutcome.photo = 'default.jpg';
      this.store.collection('outcomes').add(newOutcome);
    });
  }

  showEditDialog(outcome: any): void {
    // console.log(outcome)
    const dialogRef = this.dialog.open(EditOutcomeComponent, {
      width: '600px'
    });
    dialogRef.componentInstance.editedOutcome = outcome;
    dialogRef.afterClosed().subscribe(editedOutcome => {
      // editedOutcome.date_update = new Date();
      const updatedDoc = this.store.collection('outcomes');
      updatedDoc.doc(editedOutcome.id).update({
        amount: editedOutcome.amount,
        concept: editedOutcome.concept,
        date_outcome: editedOutcome.date_outcome,
        date_update: new Date(),
        photo: editedOutcome.photo
      });
    });
  }
  public printDate(dateOrTimestamps: any): any{
    if(dateOrTimestamps.seconds) return new Date(dateOrTimestamps.seconds*1000).toDateString();
    return dateOrTimestamps.toDateString();
  }
  private toTimestamp(strDate: any): any{ var datum = Date.parse(strDate); return datum/1000;}
  ngOnInit(): void {
  }
}
