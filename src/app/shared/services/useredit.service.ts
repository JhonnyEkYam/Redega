import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UsuariosInterface } from "../utils/users.interface";
import {formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getAuth, updateEmail, updatePassword, updateProfile,sendPasswordResetEmail } from "firebase/auth";


@Injectable({
    providedIn: 'root',
  })

  export class UsereditService {
    
    constructor(
        private auth: AngularFireAuth, 
        private router: Router,
        private afs: AngularFirestore,
        public _snackBar: MatSnackBar
        ) { 
          this.userCollection = this.afs.collection<UsuariosInterface>('usuarios');
          this.users = this.userCollection.valueChanges();
        }
    private userCollection: AngularFirestoreCollection<UsuariosInterface>;
    private users: Observable<UsuariosInterface[]>;
    
    changename(name: string, uid: string){
        this.userCollection.doc(uid).update({
            name: name
        });
        let auth1:any;
        auth1 = getAuth();
        updateProfile(auth1.currentUser,{
          displayName: name,
          photoURL: ""
        }).then(()=>{
          this.updatedata(uid);
          setTimeout(() => {
          this._snackBar.open('Nombre actualizado', 'Cerrar', {
            duration: 2000,
          });
            window.location.reload();
          }, 5000);
          
        }).catch((error)=>{
          this._snackBar.open('Error al actualizar el nombre', 'Cerrar', {
            duration: 2000,
          });
          window.location.reload();
        });
    }

    updatedata(uid: string){
      this.afs.collection('usuarios').doc(uid).valueChanges().subscribe(data => {
        localStorage.setItem('usuariobd', JSON.stringify(data));
       });
      let authdata:any;
      authdata = getAuth();
      const user = authdata.currentUser;
      localStorage.setItem('usuario', JSON.stringify(user));  
      console.log('exito');
    }

    changeemail(email: any, uid: string){
      this.userCollection.doc(uid).update({
          email: email
      });
      let auth1:any;
      auth1 = getAuth();
      updateEmail(auth1.currentUser, email).then(()=>{
        this.updatedata(uid);
        setTimeout(() => {
          this._snackBar.open('Email actualizado', 'Cerrar', {
            duration: 2000,
          });
          window.location.reload();
        }, 5000);
      }).catch((error)=>{
        setTimeout(() => {
        this._snackBar.open('Error al actualizar el email', 'Cerrar', {
          duration: 2000,
        });
        window.location.reload();
      }, 5000);
      });
    }

    changepassword(email: string, uid: string){

      let auth1:any;
      auth1 = getAuth();
      console.log(email);
      sendPasswordResetEmail(auth1, email)
        .then(() => {
          setTimeout(() => {
            this._snackBar.open('Enviado Exitosamente', 'Cerrar', {
              duration: 2000,
            });
            window.location.reload();
          }, 5000);
        })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setTimeout(() => {
          this._snackBar.open('Servicio no disponible', 'Cerrar', {
            duration: 2000,
          });
          window.location.reload();
        }, 5000);
      });

      /*
      let auth1:any;
      auth1 = getAuth();
      updatePassword(auth1.currentUser,password).then(()=>{
        this.updatedata(uid);
        setTimeout(() => {
          this._snackBar.open('Contraseña actualizada', 'Cerrar', {
            duration: 2000,
          });
          window.location.reload();
        }, 5000);
      }).catch((error: any)=>{
        setTimeout(() => {
        this._snackBar.open('Error al actualizar la contraseña', 'Cerrar', {
          duration: 2000,
        });
        console.log(error);
        window.location.reload();
      }, 5000);
      });*/

    }

    
}