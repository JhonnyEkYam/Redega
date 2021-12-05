import { Component, OnInit, Inject, inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {




  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>
) { 


}

  ngOnInit(): void {
  }

  onNoClick():void{
    this.dialogRef.close();
  }
  


}
