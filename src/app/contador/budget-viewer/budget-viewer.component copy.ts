import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from "rxjs";
//
import { query, orderBy, limit, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

import { MatDialog } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-budget-viewer',
  templateUrl: './budget-viewer.component.html',
  styleUrls: ['./budget-viewer.component.css']
})


export class BudgetViewerComponent {
  outcomes: Observable<any[]>;
  private store: AngularFirestore;
  statusOutcomesView = 1;
  total: number = 0;

  monthOutcomes = 0;
  budget = 0;

  constructor(store: AngularFirestore) {
    this.store = store
    this.statusOutcomesView = 1;
    this.outcomes = this.store.collection('outcomes', ref => ref.where('status', '==', this.statusOutcomesView).where('monthYear', '==', 202111).orderBy('date_outcome', 'desc')).valueChanges({
      idField: 'id',
    });
    const db = getFirestore();
    const outcomesRef = collection(db, 'outcomes');
    // const q = query(outcomesRef, orderBy('date_outcome'), limit(3), where('monthYear', '==', 202111));
    const q = query(outcomesRef, orderBy('amount'), limit(10), where('status', '==', 1), where('amount', '>', 250));
    (async()=>{
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((outcome: any) => {
          this.monthOutcomes += Number(outcome.data().amount)
        });
      } catch (e) {
        console.log("Error adding document: ", e);
      }
    })()
    // const monthlyOutcomes: Observable<any[]> =
    //   this.store.collection('outcomes', (ref) => ref.where('monthYear', '==', 202110)).valueChanges();
    // monthlyOutcomes.forEach((res) => {
    //   this.monthOutcomes = 0;
    //   res.forEach((outcome) => {
    //     this.monthOutcomes += outcome.amount
    //   })
    // })
  }


  setTotal() {
    this.outcomes.forEach((outcomes: any[]) => {
      if (outcomes[0].status == this.statusOutcomesView) {
        this.total = 0;
        outcomes.forEach(outcome => {
          this.total += Number(outcome.amount);
        })
        return;
      }
    })
  }

}

