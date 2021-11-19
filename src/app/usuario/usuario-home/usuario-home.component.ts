import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/shared/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
//
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Usuarios} from '@app/shared/utils/users.interface';
import { StorageService } from '@app/services/storage.service';


@Component({
  selector: 'app-usuario-home',
  templateUrl: './usuario-home.component.html',
  styleUrls: ['./usuario-home.component.css']
})
export class UsuarioHomeComponent implements OnInit {
  
  constructor(private router:Router,
    public userService: UserService,
    public auth: AngularFireAuth,
    private storageService:StorageService) { }

  ngOnInit(): void {
//    this.getuser();
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
