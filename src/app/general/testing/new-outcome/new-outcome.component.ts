import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-outcome',
  templateUrl: './new-outcome.component.html',
  styleUrls: ['./new-outcome.component.css']
})
export class NewOutcomeComponent implements OnInit {
  newOutcome = {
    concept: '',
    amount: '',
    photo: '',
    date_outcome: '',
    date_log: '',
    date_update: ''
  };
  constructor(public dialogRef: MatDialogRef<NewOutcomeComponent>) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){}
}
