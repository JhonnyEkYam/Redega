import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-edit-outcome-c',
  templateUrl: './edit-outcome-c.component.html',
  styleUrls: ['./edit-outcome-c.component.css']
})
export class EditOutcomeCComponent implements OnInit {
  editedOutcome: any;
  constructor(public dialogRef: MatDialogRef<EditOutcomeCComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();

  }
  newDate(date: any): any {
    return new Date(date);
  }

  ngOnInit(): void {
  }

}
