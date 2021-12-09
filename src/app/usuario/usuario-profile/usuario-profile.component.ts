import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/shared/services/user.service';
import { UsereditService } from '@app/shared/services/useredit.service';
import { Observable } from 'rxjs';
import {UsuariosInterface} from 'src/app/shared/utils/users.interface';
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-usuario-profile',
  templateUrl: './usuario-profile.component.html',
  styleUrls: ['./usuario-profile.component.css']
})
export class UsuarioProfileComponent implements OnInit {
  panelOpenState = false;
  datap = JSON.parse(localStorage.getItem('usuariobd') || '{}');
  /*private Usuariodoc: AngularFirestoreDocument<UsuariosInterface>;
  user: Observable<UsuariosInterface> | any;
  */
  datauser: any;
  datauser1: any;
  hide_spin = true;
  hide_spin1 = true;
  dataname = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]);
  dataemail = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(20)]);
  datapassword = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);
  datapassword1 = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);

  constructor(
    private router:Router, 
    private afs: AngularFirestore, 
    public userService: UserService,
    public userEdit: UsereditService,
    )
   { }

  ngOnInit(): void {  
    this.datauser = JSON.parse(localStorage.getItem('usuariobd') || '{}');
    this.datauser1 = JSON.parse(localStorage.getItem('usuario') || '{}');
  }

  email = new FormControl('', [Validators.email]);
  hide = true;
  hide1 = true;

  getErrorMessage() {
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  /*getErrorMessage1() {
    return this.dataname.hasError('name') ? 'Not a valid email' : '';
  }
*/
  goToHome(){
    this.router.navigate(['usuario/home']);
  }

  update(){
    this.afs.collection('usuarios').doc(this.datauser.uid).update({
      date_update: this.userService.todaydate(),
      name: this.dataname.value,
    })
  }
  
  changename(){
      this.hide_spin = false;
      if(this.dataname.valid){
        const name = this.dataname.value;
        const uid = this.datauser.uid;
        //Proceso
          this.userEdit.changename(name, uid);
      } else {
      this.hide_spin = true;
      }
  }
  changeemail(){
    this.hide_spin = false;
    if(this.dataemail.valid){
      const email = this.dataemail.value;
      const uid = this.datauser.uid;
      //Proceso
        this.userEdit.changeemail(email, uid);
    } else {
    this.hide_spin = true;
    }
  }
  changepassword(){
    this.hide_spin1 = false;

    this.userEdit.changepassword(this.datauser1.email,this.datauser.uid);

    /*
    if(this.datapassword.valid && this.datapassword1.valid && this.datapassword.value == this.datapassword1.value){
      if(this.datapassword.valid){
        const password = this.datapassword.value;
        const uid = this.datauser.uid;
        //Proceso
          this.userEdit.changepassword(password, uid);
      } else {
      this.hide_spin = true;
      }
    } else {
    this.hide_spin = true;
      this.datap=true;
    }
    */
  }
  
  
  none(){
    //this.router.navigate(['usuario/home']);
const auth = getAuth();
const user = auth.currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;
console.log(displayName);
console.log(user);
  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
}
  }

  change(){
    if(this.hide_spin){
      this.hide_spin = false;
    }else{
      this.hide_spin = true;
    }
  }

}
