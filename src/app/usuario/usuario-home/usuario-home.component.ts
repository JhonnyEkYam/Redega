import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/shared/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
//
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-usuario-home',
  templateUrl: './usuario-home.component.html',
  styleUrls: ['./usuario-home.component.css']
})
export class UsuarioHomeComponent implements OnInit {
  datauser1 = JSON.parse(localStorage.getItem('usuariobd') || '{}');
  user: string | undefined;
  jstoday = '';

  hide = true;
  // Conexion a Firebase
  private store: AngularFirestore;
  // Observables Outcomes
  outcomes: Observable<any[]>;
  // Otras
  total: number = 0; // Monto mensual del mes seleccionado
  today = new Date(); // Fecha actual
  month = new Date().getMonth(); // Mes actual

  constructor(private router: Router,
    public userService: UserService,
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    store: AngularFirestore
  ) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-0500');


    // Obtener ID AÑOFECHA 
    let monthYear = Number(
      this.today.getFullYear()
      + '' + ((Number(this.today.getMonth()) + 1) < 10 ? '0' : '') + '' +
      (Number(this.today.getMonth()) + 1)
    );
    // Conexion a Firestore
    this.store = store
    // Peticion de los gastos del mes ACTUAL
    this.outcomes = this.store.collection('outcomes', ref => ref
      .where('status', '==', 1)
      // .where('monthYear', '==', monthYear)
      .orderBy('date_outcome', 'desc')
      .limit(5)
    ).valueChanges();
    // Sumar los gastos del mes
    this.setTotal();
  }


  ngOnInit(): void {
  }

  goToOutcomes() {
    this.router.navigate(['/usuario/gastos']);
  }
  // cargado de imagenes start
  imagenes: any[] = [];
  cargarImagen(event: any) {
    let archivos = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(archivos[0]);
    reader.onloadend = () => {
      console.log(reader.result);
      this.imagenes.push(reader.result);

    }
  }


  setTotal() {
    this.outcomes.forEach((outcomes: any[]) => {
      try {
        if (outcomes[0].status == 1) {
          this.total = 0;
          outcomes.forEach(outcome => {
            this.total += Number(outcome.amount);
          })
          return;
        }
      } catch (err) {
        this.total = 0;
      }
    })
  }
  
  public printDate(dateOrTimestamps: any): any {
    if (dateOrTimestamps.seconds) return new Date(dateOrTimestamps.seconds * 1000).toDateString();
    return dateOrTimestamps.toDateString();
  }  

  public isFilled(){
    return this.total > 0;
  }

  
  public getMonth(monthIndex: number) {
    let month;

    // Obtener month
    switch (monthIndex) {
      case 0:
        month = 'Enero';
        break;
      case 1:
        month = 'Febrero';
        break;
      case 2:
        month = 'Marzo';
        break;
      case 3:
        month = 'Abril';
        break;
      case 4:
        month = 'Mayo';
        break;
      case 5:
        month = 'Junio';
        break;
      case 6:
        month = 'Julio';
        break;
      case 7:
        month = 'Agosto';
        break;
      case 8:
        month = 'Septiembre';
        break;
      case 9:
        month = 'Octubre';
        break;
      case 10:
        month = 'Noviembre';
        break;
      case 11:
        month = 'Diciembre';
        break;
      default:
        month = 'Invalido';
        break;
    }

    return month;
  }
}
