import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContadorHomeComponent } from './contador/contador-home/contador-home.component';
import { ContadorProfileComponent } from './contador/contador-profile/contador-profile.component';
import { EncargadoHomeComponent } from './encargado/encargado-home/encargado-home.component';
import { EncargadoProfileComponent } from './encargado/encargado-profile/encargado-profile.component';
import { RealtimetestComponent } from './general/testing/jey/realtimetest/realtimetest.component';
import { TestingComponent } from './general/testing/testing.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { UsuarioHomeComponent } from './usuario/usuario-home/usuario-home.component';
import { UsuarioOutcomesComponent } from './usuario/usuario-outcomes/usuario-outcomes.component';
import { UsuarioProfileComponent } from './usuario/usuario-profile/usuario-profile.component';
//Guardian
import { AngularFireAuthGuard,redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
//Reglas de navegacion
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToUsers = () => redirectLoggedInTo(['usuario/home']);


const routes: Routes = [
  // Vistas generales
  {path: 'test-gastos', component: TestingComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  {path: 'realtimetest', component: RealtimetestComponent},
  // Vistas de Login y de registro
  {path: '', component: LoginComponent, canActivate: [AngularFireAuthGuard] , data: { authGuardPipe: redirectLoggedInToUsers }},
  {path: 'register', component: RegisterComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToUsers } },
  // Vistas de CONTADOR
  {path: 'contador/home', component: ContadorHomeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  {path: 'contador/profile', component: ContadorProfileComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  // Vistas de ENCARGADO
  {path: 'encargado/home', component: EncargadoHomeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  {path: 'encargado/profile', component: EncargadoProfileComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  // Vistas de Usuario
  {path: 'usuario/home', component: UsuarioHomeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  {path: 'usuario/profile', component: UsuarioProfileComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  {path: 'usuario/gastos', component: UsuarioOutcomesComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
