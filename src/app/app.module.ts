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
import { NewOutcomeComponent } from './general/testing/new-outcome/new-outcome.component';
import { EditOutcomeComponent } from './general/testing/edit-outcome/edit-outcome.component';
//SERVICIOS FIREBASE
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import {AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { RealtimetestComponent } from './general/testing/jey/realtimetest/realtimetest.component';
//Nuevos componentes
import { SidebarComponent } from './contador/sidebar/sidebar.component';
import { CrudOutcomesComponent } from './contador/crud-outcomes/crud-outcomes.component';
import { CreateOutcomeComponent } from './contador/crud-outcomes/create-outcome/create-outcome.component';
import { EditOutcomeCComponent } from './contador/crud-outcomes/edit-outcome-c/edit-outcome-c.component';
import { CreateIncomeComponent } from './contador/crud-outcomes/create-income/create-income.component';
import { ContadorIncomesComponent } from './contador/contador-incomes/contador-incomes.component';
import { BudgetViewerComponent } from './contador/budget-viewer/budget-viewer.component';
import { CrudIncomesComponent } from './contador/crud-incomes/crud-incomes.component';
import { EditIncomeComponent } from './contador/crud-incomes/edit-income/edit-income.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    NewOutcomeComponent,
    EditOutcomeComponent,
    RealtimetestComponent,
    SidebarComponent,
    CrudOutcomesComponent,
    CreateOutcomeComponent,
    EditOutcomeCComponent,
    CreateIncomeComponent,
    ContadorIncomesComponent,
    BudgetViewerComponent,
    CrudIncomesComponent,
    EditIncomeComponent
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
    MatGridListModule,
    AngularFireStorageModule,
  ],
  providers: [{ provide: BUCKET, useValue: 'gs://redega-system.appspot.com' },MatSnackBarModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
