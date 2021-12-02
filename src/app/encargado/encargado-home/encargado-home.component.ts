import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Router } from '@angular/router';


/**
 * @title Basic use of `<table mat-table>`
 */

 @Component({
  selector: 'app-encargado-home',
  templateUrl: './encargado-home.component.html',
  styleUrls: ['./encargado-home.component.css']
})



export class EncargadoHomeComponent implements OnInit {


  constructor( private router:Router,) {
 

  }

  ngOnInit(): void {
  
      this.router.navigate(['encargado/users']);
    
  }

}


