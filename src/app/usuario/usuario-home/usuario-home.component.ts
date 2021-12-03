import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/shared/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
//
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {formatDate } from '@angular/common';


@Component({
  selector: 'app-usuario-home',
  templateUrl: './usuario-home.component.html',
  styleUrls: ['./usuario-home.component.css']
})
export class UsuarioHomeComponent implements OnInit {
  datauser1 = JSON.parse(localStorage.getItem('usuariobd') || '{}'); 
  user: string | undefined;
  today= new Date();
  jstoday = '';
  
  hide = true;

  constructor(private router:Router,
    public userService: UserService,
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    
    ) 
    { 
      this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-0500');  
    }


  ngOnInit(): void {
  }

  goToOutcomes(){
    this.router.navigate(['/usuario/gastos']);
  }
  // cargado de imagenes start
  imagenes: any[]=[];
  cargarImagen(event:any){
    let archivos=event.target.files;
    let reader=new FileReader();
    reader.readAsDataURL(archivos[0]);
    reader.onloadend = ()=>{
      console.log(reader.result);
      this.imagenes.push(reader.result);

    }
  }
  
}
