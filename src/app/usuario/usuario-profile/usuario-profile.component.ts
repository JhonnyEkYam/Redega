import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/shared/services/user.service';
import { Observable } from 'rxjs';
import {UsuariosInterface} from 'src/app/shared/utils/users.interface';

@Component({
  selector: 'app-usuario-profile',
  templateUrl: './usuario-profile.component.html',
  styleUrls: ['./usuario-profile.component.css']
})
export class UsuarioProfileComponent implements OnInit {
  /*private Usuariodoc: AngularFirestoreDocument<UsuariosInterface>;
  user: Observable<UsuariosInterface> | any;
  */
  datauser: any;
  dataname = new FormControl('', [Validators.required, Validators.minLength(4)]);
  constructor(
    private router:Router, 
    private afs: AngularFirestore, 
    public userService: UserService
    )
   { }

  ngOnInit(): void {  
    const datauser = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.afs.collection('usuarios').doc(datauser.uid).valueChanges().subscribe(data => {
      console.log(data);
      localStorage.setItem('usuariobd', JSON.stringify(data));
      
    });

    this.datauser = JSON.parse(localStorage.getItem('usuariobd') || '{}');

  }

  email = new FormControl('', [Validators.email]);
  hide = true;
  hide1 = true;

  getErrorMessage() {
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  goToHome(){
    this.router.navigate(['usuario/home']);
  }

  update(){
   
    this.afs.collection('usuarios').doc(this.datauser.uid).update({
      date_update: this.userService.todaydate(),
      name: this.dataname.value,
    })

  }

}
