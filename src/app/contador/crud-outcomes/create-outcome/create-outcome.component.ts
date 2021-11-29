import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {formatDate } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-create-outcome',
  templateUrl: './create-outcome.component.html',
  styleUrls: ['./create-outcome.component.css']
})
export class CreateOutcomeComponent implements OnInit {
  today= new Date();
  jstoday = '';
  a = '';
  data= '';
  uploadPercent: Observable<number> | any;
  downloadURL: Observable<string> | any;
  condition = false;

  constructor(public dialogRef: MatDialogRef<CreateOutcomeComponent>, private storage: AngularFireStorage) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-0500');  
  }

  
  
  newOutcome = {
    concept: '',
    amount: '',
    photo: this.data,
    date_outcome: '',
    date_log: '',
    date_update: ''
  };
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(){};

  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = 'factura-'+this.jstoday;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    return task.then(() => {
      this.storage.ref(filePath).getDownloadURL().subscribe(url => {
        this.newOutcome.photo = url;
        //console.log(url);
        this.data = url;
        this.condition = true;
      });
    });
  }


}
