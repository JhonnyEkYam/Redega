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
  user: string | undefined;
  today= new Date();
  jstoday = '';
  datauser1: any;
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
    //this.b();
    // obtener usuario 
    /*this.userService.getusers().subscribe(users=>{
      
    })*/
    /*
    this.coments = this.afs.collectionGroup('usuarios', ref => ref.where('user', '==', user?.uid))
    .valueChanges({ idField: 'docId' });
    */
    const datauser = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.afs.collection('usuarios').doc(datauser.uid).valueChanges().subscribe(data => {
      console.log(data);
      localStorage.setItem('usuariobd', JSON.stringify(data));
      
    });
    this.datauser1 = JSON.parse(localStorage.getItem('usuariobd') || '{}');

   //this.a();
   //this.c();
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
  // cargar imagen end
  /*getuser(){
    this.userService.userinfo();
  }*/

  
}
