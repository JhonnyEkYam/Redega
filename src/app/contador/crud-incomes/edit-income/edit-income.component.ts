import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-income',
  templateUrl: './edit-income.component.html',
  styleUrls: ['./edit-income.component.css']
})
export class EditIncomeComponent {
  editedIncome: any;
  dataamount = new FormControl(1, [
    Validators.min(1)
  ]);
  datadate = new FormControl('', [
  ]);
  constructor(public dialogRef: MatDialogRef<EditIncomeComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();

  }
  newDate(date: any): any {
    return new Date(date);
  }

    
  getErrorMessage() {
    if (this.dataamount.hasError('required')) {
      return 'You must enter a value';
    }

    return this.dataamount.hasError('email') ? 'Not a valid email' : '';
  }
}
