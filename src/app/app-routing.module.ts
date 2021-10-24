import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContadorHomeComponent } from './contador/contador-home/contador-home.component';
import { ContadorProfileComponent } from './contador/contador-profile/contador-profile.component';
import { EncargadoHomeComponent } from './encargado/encargado-home/encargado-home.component';
import { EncargadoProfileComponent } from './encargado/encargado-profile/encargado-profile.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { UsuarioHomeComponent } from './usuario/usuario-home/usuario-home.component';
import { UsuarioProfileComponent } from './usuario/usuario-profile/usuario-profile.component';

const routes: Routes = [
  // Vistas generales

  // Vistas de Login y de registro
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  // Vistas de CONTADOR
  {path: 'contador/home', component: ContadorHomeComponent},
  {path: 'contador/profile', component: ContadorProfileComponent},
  // Vistas de ENCARGADO
  {path: 'encargado/home', component: EncargadoHomeComponent},
  {path: 'encargado/profile', component: EncargadoProfileComponent},
  // Vistas de Usuario
  {path: 'usuario/home', component: UsuarioHomeComponent},
  {path: 'usuario/profile', component: UsuarioProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
