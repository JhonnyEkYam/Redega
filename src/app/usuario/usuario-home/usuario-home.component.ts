import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/shared/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
//
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Usuarios} from '@app/shared/utils/users.interface';

@Component({
  selector: 'app-usuario-home',
  templateUrl: './usuario-home.component.html',
  styleUrls: ['./usuario-home.component.css']
})
export class UsuarioHomeComponent implements OnInit {

  private usuariosCollection: AngularFirestoreCollection<Usuarios>;
  usuarios: Observable<Usuarios[]>;
  
  constructor(private router:Router,
    public userService: UserService,
    public auth: AngularFireAuth,
    private afs: AngularFirestore) 
    {
    this.usuariosCollection = afs.collection<Usuarios>('usuarios');
    this.usuarios = this.usuariosCollection.valueChanges(); 
    }

    addItem(usuarios: Usuarios) {
      this.usuariosCollection.add(usuarios);
    }

  ngOnInit(): void {
//    this.getuser();
  }

  goToOutcomes(){
    this.router.navigate(['/usuario/gastos']);
  }

  getuser(){
     return this.userService.userinfo();
  }

}
