import { Injectable } from "@angular/core";
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UsuariosInterface } from "../utils/users.interface";
import {formatDate } from '@angular/common';


@Injectable({
    providedIn: 'root',
  })

  export class UserService {

    today= new Date();
    jstoday = '';

    constructor(
        private auth: AngularFireAuth, 
        private router: Router,
        private afs: AngularFirestore
        ) { 
          this.userCollection = this.afs.collection<UsuariosInterface>('usuarios');
          this.users = this.userCollection.valueChanges();
          this.check()
          this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-0500');  
        }
    private userCollection: AngularFirestoreCollection<UsuariosInterface>;
    private users: Observable<UsuariosInterface[]>;

    getusers(){
      return this.users;
    }

    check(){
        if(this.auth.currentUser == null){
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }

    login(dataemail:any,datapassword:any){
        this.auth.signInWithEmailAndPassword(dataemail, datapassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem('usuario', JSON.stringify(user));
        const datauser = JSON.parse(localStorage.getItem('usuario') || '{}');
        //Usuarios
        this.afs.collection('usuarios').doc(datauser.uid).update({
          date_update: this.jstoday,
          
          });
          
        this.router.navigate(['usuario/home']);

        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
    logout(): void {
        this.auth.signOut().then(() => {
        localStorage.removeItem('usuario');
        this.router.navigate(['/']);
        }
    );
    }
    //Cuando te registras por primera vez este login se activa
    login1(dataemail:any,datapassword:any){
      this.auth.signInWithEmailAndPassword(dataemail, datapassword)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      localStorage.setItem('usuario', JSON.stringify(user));
      const datauser = JSON.parse(localStorage.getItem('usuario') || '{}');
      //Usuarios siendo registrados en la BD
      this.afs.collection('usuarios').doc(datauser.uid).set({
        date_log: this.jstoday,
        date_update: this.jstoday,
        email: datauser.email,
        name: '',
        rol: 1,
        uid: datauser.uid
      });

      this.router.navigate(['usuario/home']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

    register(dataemail:any,datapassword:any){
        this.auth.createUserWithEmailAndPassword(dataemail, datapassword)
        .then(()=>{
          this.login1(dataemail,datapassword);
        })
        .catch((error)=>{
          alert("Error al registrarse");
          alert(error);
        })
      }
    userinfo(){
        return this.auth.user;
    }

    checkrole(){

      /*
      rol == 1 -> usuario
      rol == 2 -> encargado
      rol == 3 -> admin
      */
    }

    todaydate(){
      return this.jstoday;
    }
    

}