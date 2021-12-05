import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {formatDate } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.css']
})
export class CreateIncomeComponent implements OnInit {

  today= new Date();
  jstoday = '';
  a = '';
  data= '';
  condition = false;

  dataamount = new FormControl(1, [
    Validators.required,
    Validators.min(1)
  ]);
  datadate = new FormControl('', [
    Validators.required
  ]);

  constructor(public dialogRef: MatDialogRef<CreateIncomeComponent>, private storage: AngularFireStorage) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-0500');  
  }

  newIncome = {
    amount: '',
    date_income: '',
    date_log: '',
    date_update: '',
    monthYear: Number(0)
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){};
  getErrorMessage() {
    if (this.dataamount.hasError('required')) {
      return 'You must enter a value';
    }

    return this.dataamount.hasError('email') ? 'Not a valid email' : '';
  }
}

