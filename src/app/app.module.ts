import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@app/material.module';
/** FORMS */
import { MatFormFieldModule } from '@angular/material/form-field'; 
import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from "@angular/material/dialog";
//icons y botones
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
// DATES
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';// /datetime;
// tablas
import {MatGridListModule} from '@angular/material/grid-list';
/** GENERALES */
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
import { UsuarioOutcomesComponent } from './usuario/usuario-outcomes/usuario-outcomes.component';
import { DateRangePickerComponent } from './shared/date-range-picker/date-range-picker.component';
import { NavComponent } from './usuario/nav/nav.component';
import { TestingComponent } from './general/testing/testing.component';
//SERVICIOS FIREBASE
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { NewOutcomeComponent } from './general/testing/new-outcome/new-outcome.component';


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
    FooterComponent,
    UsuarioOutcomesComponent,
    DateRangePickerComponent,
    NavComponent,
    TestingComponent,
    NewOutcomeComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
