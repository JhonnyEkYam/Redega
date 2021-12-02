import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-encargado-users',
  templateUrl: './encargado-users.component.html',
  styleUrls: ['./encargado-users.component.css']
})
export class EncargadoUsersComponent implements OnInit {

  private store: AngularFirestore;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'name' ,'email','rol', 'options'];
  //dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog, store: AngularFirestore, private storage: AngularFireStorage) {
    this.store = store;

  }

  ngOnInit(): void {
    this.store.collection('usuarios').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    })
  }

}










