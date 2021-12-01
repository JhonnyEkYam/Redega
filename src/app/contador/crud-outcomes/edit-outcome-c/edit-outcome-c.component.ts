import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-outcome-c',
  templateUrl: './edit-outcome-c.component.html',
  styleUrls: ['./edit-outcome-c.component.css']
})
export class EditOutcomeCComponent implements OnInit {
  today= new Date();
  data= '';
  condition = false;
  editedOutcome: any;
  dataamount = new FormControl(1, [
    Validators.min(1),
    Validators.required,
  ]);
  dataconcept = new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ])
  jstoday: any;
  constructor(public dialogRef: MatDialogRef<EditOutcomeCComponent>, private storage: AngularFireStorage) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-0500');  

   }
  

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

  
  async uploadFile(event: any): Promise<void> {
    const file = event.target.files[0];
    const filePath = 'factura-'+this.jstoday;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    await task;
    this.storage.ref(filePath).getDownloadURL().subscribe(url => {
      this.editedOutcome.photo = url;
      this.data = url;
      this.condition = true;
    });
  }

}
