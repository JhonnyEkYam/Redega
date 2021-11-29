import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-outcome-c',
  templateUrl: './edit-outcome-c.component.html',
  styleUrls: ['./edit-outcome-c.component.css']
})
export class EditOutcomeCComponent implements OnInit {
  editedOutcome: any;
  dataamount = new FormControl(1, [
    Validators.min(1),
    Validators.required,
  ]);
  dataconcept = new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ])
  constructor(public dialogRef: MatDialogRef<EditOutcomeCComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();

  }
  newDate(date: any): any {
    return new Date(date);
  }

  ngOnInit(): void {
  }
  
  getErrorMessage(){
    if(
      this.dataamount.hasError('required') ||
      this.dataconcept.hasError('required')
    ){
      return 'You must enter a value';
    }
    return '';
  }

}
