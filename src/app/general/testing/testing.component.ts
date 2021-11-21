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
  outcomes: Observable<any[]>;
  // private readonly itemsRef: AngularFirestoreCollection<Item>;
  // private readonly profileRef: AngularFirestoreDocument<Profile>;
  // observables for template
  // items: Observable<Item[]>;
  // profile: Observable<Profile>;
  private store: AngularFirestore;

  constructor(public dialog: MatDialog, store: AngularFirestore) {
    this.store = store;
    
    this.outcomes = this.store.collection('outcomes', ref=>ref.where('status', '==', 1)).valueChanges({
      idField: 'id',
    });
    // this.itemsRef = this.store.collection('items', ref => ref.where('user', '==', 'davideast').limit(10));
    // this.items = this.itemsRef.valueChanges().map(snap => snap.docs.map(data => doc.data()));
    // this.items = from(this.itemsRef); // you can also do this with no mapping
    // this.profileRef = afs.doc('users/davideast');
    // this.profile = this.profileRef.valueChanges();
  }
  
  ngOnInit() {}

  showCreateDialog(): void {
    const dialogRef = this.dialog.open(NewOutcomeComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(newOutcome => {
      newOutcome.date_log = new Date();
      newOutcome.date_update = new Date();
      newOutcome.photo = 'default.jpg';
      newOutcome.status = '1';
      this.store.collection('outcomes').add(newOutcome);
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
    });
  }
  deleteLog(idOutcome: string): void {
    const updatedDoc = this.store.collection('outcomes');
    updatedDoc.doc(idOutcome).update({
      status: 0
    });
  }
  seeDeleted(){
    this.outcomes = this.store.collection('outcomes', ref=>ref.where('status', '==', 0)).valueChanges({
      idField: 'id',
    });
  }
  public printDate(dateOrTimestamps: any): any {
    if (dateOrTimestamps.seconds) return new Date(dateOrTimestamps.seconds * 1000).toDateString();
    return dateOrTimestamps.toDateString();
  }
}
