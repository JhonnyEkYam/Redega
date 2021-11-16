// import { AngularFirestore } from "@angular/fire/firestore";
// import { AngularFireStore, AngularFirestore, Firestore } from '@angular/fire/firestore';
import {Observable} from "rxjs";
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  outcomes: Observable<any[]>;
  
  constructor(store: AngularFirestore) {
    this.outcomes = store.collection('outcomes').valueChanges();
  }
  ngOnInit(): void {
  }

}
