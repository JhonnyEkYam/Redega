import {Observable} from "rxjs";
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {NewOutcomeComponent} from "./new-outcome/new-outcome.component";
import {MatDialog} from '@angular/material/dialog';

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
    this.outcomes = store.collection('outcomes').valueChanges();
  }

  showCreateBookDialog(): void {
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
  ngOnInit(): void {
  }
}
