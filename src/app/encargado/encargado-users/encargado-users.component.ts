import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditUserComponent } from "../edit-user/edit-user.component";
import { Observable, Timestamp } from "rxjs";

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
  data: any;

  
  constructor(public dialog: MatDialog, store: AngularFirestore, private storage: AngularFireStorage) {
    this.store = store;

  }

  ngOnInit(): void {
    this.store.collection('usuarios').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    })
  }

  editUser(data: any):void{
    const dialogRef = this.dialog.open(EditUserComponent,{
      width:'350px',
      data:data
    });
  
   
  }

  updateUser(id: string, data: any): Promise<void> {
    return this.store.doc(id).update(data);
  }

  deleteUser(id: string): Promise<void> {
    return this.store.doc(id).delete();
  }

}









