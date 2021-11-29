import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {formatDate } from '@angular/common';

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

  constructor(public dialogRef: MatDialogRef<CreateIncomeComponent>, private storage: AngularFireStorage) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-0500');  
  }

  newIncome = {
    amount: '',
    date_income: '',
    date_log: '',
    date_update: ''
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){};
}

