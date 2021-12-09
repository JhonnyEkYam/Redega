import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContadorHomeComponent } from './contador/contador-home/contador-home.component';
import { ContadorProfileComponent } from './contador/contador-profile/contador-profile.component';
import { EncargadoHomeComponent } from './encargado/encargado-home/encargado-home.component';
import { EncargadoProfileComponent } from './encargado/encargado-profile/encargado-profile.component';
import { EncargadoUsersComponent } from './encargado/encargado-users/encargado-users.component';
import { RealtimetestComponent } from './general/testing/jey/realtimetest/realtimetest.component';
import { TestingComponent } from './general/testing/testing.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { UsuarioHomeComponent } from './usuario/usuario-home/usuario-home.component';
import { UsuarioOutcomesComponent } from './usuario/usuario-outcomes/usuario-outcomes.component';
import { UsuarioProfileComponent } from './usuario/usuario-profile/usuario-profile.component';
import { ContadorIncomesComponent } from './contador/contador-incomes/contador-incomes.component';
//Guardian
import { AngularFireAuthGuard,redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/compat/auth-guard';
//Reglas de navegacion
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToUsers = () => redirectLoggedInTo(['usuario/home']);


const routes: Routes = [
  // Vistas generales
  {path: 'test-gastos', component: TestingComponent, ...canActivate(redirectUnauthorizedToLogin) },
  {path: 'realtimetest', component: RealtimetestComponent},
  // Vistas de Login y de registro
  {path: '', component: LoginComponent, ...canActivate(redirectLoggedInToUsers)},
  {path: 'register', component: RegisterComponent, ...canActivate(redirectLoggedInToUsers)  },
  // Vistas de CONTADOR
  {path: 'contador/home', component: ContadorHomeComponent, ...canActivate(redirectUnauthorizedToLogin) },
  {path: 'contador/profile', component: ContadorProfileComponent, ...canActivate(redirectUnauthorizedToLogin) },
  {path: 'contador/ingresos', component: ContadorIncomesComponent, ...canActivate(redirectUnauthorizedToLogin) },
  // Vistas de ENCARGADO
  {path: 'encargado/home', component: EncargadoHomeComponent, ...canActivate(redirectUnauthorizedToLogin) },
  {path: 'encargado/profile', component: EncargadoProfileComponent, ...canActivate(redirectUnauthorizedToLogin) },
  {path: 'encargado/users', component: EncargadoUsersComponent, ...canActivate(redirectUnauthorizedToLogin) },
  // Vistas de Usuario
  {path: 'usuario/home', component: UsuarioHomeComponent, ...canActivate(redirectUnauthorizedToLogin) },
  {path: 'usuario/profile', component: UsuarioProfileComponent, ...canActivate(redirectUnauthorizedToLogin) },
  {path: 'usuario/gastos', component: UsuarioOutcomesComponent, ...canActivate(redirectUnauthorizedToLogin) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
