import { Injectable } from "@angular/core";
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UsuariosInterface } from "../utils/users.interface";
import {formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
  })

  export class UserService {
    durationInSeconds = 3;
    today= new Date();
    jstoday = '';

    constructor(
        private auth: AngularFireAuth, 
        private router: Router,
        private afs: AngularFirestore,
        public _snackBar: MatSnackBar
        ) { 
          this.userCollection = this.afs.collection<UsuariosInterface>('usuarios');
          this.users = this.userCollection.valueChanges();
          this.check()
          this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-0500',
          );  
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
        this.afs.collection('usuarios').doc(datauser.uid).valueChanges().subscribe(data => {
          localStorage.setItem('usuariobd', JSON.stringify(data));
          });
          this.loginmsg();
        setTimeout(() => {
          const datap = JSON.parse(localStorage.getItem('usuariobd') || '{}');
          if(datap.rol == 1){
            this.router.navigate(['usuario/home']);
          } else if(datap.rol == 2){
            this.router.navigate(['contador/home']);
          } else if(datap.rol == 3){
            this.router.navigate(['encargado/users']);
          }
        }, 4000);
        

        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.errorlogin(errorCode);
        setTimeout(() => {

          window.location.reload();
        }, 3000);
      });
    }
    logout(){
        this.auth.signOut().then(() => {
        /*localStorage.removeItem('usuario');
        localStorage.removeItem('usuariobd');*/
        localStorage.clear();
        this.router.navigate(['/']);
        }
    );
    }

    
    //Cuando te registras por primera vez este login se activa
    login1(dataemail:any,datapassword:any,dataname:any){
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
        name: dataname,
        rol: 1,
        uid: datauser.uid
      });

      this.afs.collection('usuarios').doc(datauser.uid).valueChanges().subscribe(data => {
        localStorage.setItem('usuariobd', JSON.stringify(data));
        });
        this.loginmsg();
        setTimeout(() => {
          this.router.navigate(['usuario/home']);
        }, 3000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.errorlogin(errorCode);
    });
  }

    register(dataemail:any,datapassword:any, dataname:any){
        this.auth.createUserWithEmailAndPassword(dataemail, datapassword)
        .then(()=>{
          this.login1(dataemail,datapassword,dataname);
        })
        .catch((error)=>{
          const errorCode = error.code;
          const errorMessage = error.message;
        this.errorregister(errorCode);  
        setTimeout(() => {
          window.location.reload();
        }, 3000);

        })
      }

    userinfo(){
        return this.auth.user;
    }

    checkrole(){
      const datap = JSON.parse(localStorage.getItem('usuariobd') || '{}');
      switch(datap.rol){
        case 1:
          return 1;
        case 2:
          return 2;
        case 3:
          return 3;
        default:
          return false;
      }
      /*
      rol == 1 -> usuario
      rol == 2 -> contador
      rol == 3 -> encargado = admin
      */
    }

    todaydate(){
      return this.jstoday;
    }
    errorlogin(errorCode:any){
      errorCode = errorCode.toString();
      if(errorCode == "auth/wrong-password"){
        this.openError('Error en las credenciales','X');
        this.router.navigate(['']);
      } else if(errorCode == "auth/user-not-found"){
        this.openError('El correo electrónico que ingresaste no está conectado a una cuenta.','X');
        this.router.navigate(['']);
    }
  }
  errorregister(errorCode:any){
    errorCode = errorCode.toString();
    if(errorCode == "auth/email-already-in-use"){
      this.openError('El correo electrónico que ingresaste ya está conectado a una cuenta.','X');
    } else if(errorCode == "auth/invalid-email"){
      this.openError('El correo electrónico es invalido','X');
    }
  }

  loginmsg(){
    this.openmsg('Inicio Exitoso, Redirigiendo','');
  }

  openError(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000,});
  }

  openmsg(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,});
  }
    

}