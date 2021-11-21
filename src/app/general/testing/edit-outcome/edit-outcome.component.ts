import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-edit-outcome',
  templateUrl: './edit-outcome.component.html',
  styleUrls: ['./edit-outcome.component.css']
})
export class EditOutcomeComponent implements OnInit {
  editedOutcome: any;
  constructor(public dialogRef: MatDialogRef<EditOutcomeComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();

  }
  newDate(date: any): any {
    return new Date(date);
  }

  ngOnInit(): void {
  }

}
