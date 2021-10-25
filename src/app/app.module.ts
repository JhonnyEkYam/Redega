import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@app/material.module';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

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
    UsuarioProfileComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
