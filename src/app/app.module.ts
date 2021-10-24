import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './login/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { UsuarioHomeComponent } from './usuario/usuario-home/usuario-home.component';
import { EncargadoHomeComponent } from './encargado/encargado-home/encargado-home.component';
import { ContadorHomeComponent } from './contador/contador-home/contador-home.component';
import { ContadorProfileComponent } from './contador/contador-profile/contador-profile.component';
import { EncargadoProfileComponent } from './encargado/encargado-profile/encargado-profile.component';
import { UsuarioProfileComponent } from './usuario/usuario-profile/usuario-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UsuarioHomeComponent,
    EncargadoHomeComponent,
    ContadorHomeComponent,
    ContadorProfileComponent,
    EncargadoProfileComponent,
    UsuarioProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
