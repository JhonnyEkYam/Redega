import { Injectable } from "@angular/core";
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })

  export class UserService {
    constructor(
        private auth: AngularFireAuth, 
        private router: Router,
        ) { this.check()}

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
        console.log('Exito');
        this.router.navigate(['usuario/home']);
        /*
        console.log(user);
        console.log(user?.metadata.lastSignInTime);
        console.log(user?.uid);
        console.log(user?.email);
        console.log(user?.metadata.creationTime);
        console.log(user?.providerData);
    */
        // ...
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
    logout(): void {
        this.auth.signOut().then(() => {
        this.router.navigate(['/']);
        }
    );
    }
    register(dataemail:any,datapassword:any){
        this.auth.createUserWithEmailAndPassword(dataemail, datapassword)
        .then(()=>{
          this.router.navigate(['usuario/home']);
        })
        .catch(()=>{
          alert("Error al registrarse");
        })
      }
    userinfo(){
        return this.auth.user;
    }

}