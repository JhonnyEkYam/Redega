import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  dataUser: any;
  confirmDeleteUser:boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>
) { 


}

  ngOnInit(): void {
  }

  onNoClick():void{
    this.dialogRef.close();
  }


}
