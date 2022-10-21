import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { AngularMaterialModule } from './angular-material.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";



import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";




import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AboutComponent } from "./home_page/about/about.component";
import { ClassesComponent } from "./home_page/classes/classes.component";
import { ContactComponent } from "./home_page/contact/contact.component";
import { SchedulesComponent } from "./home_page/schedules/schedules.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { HeaderComponent } from './home_page/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BannerComponent } from './home_page/banner/banner.component';
import { ReservationsComponent } from './home_page/reservations/reservations.component';
import { UsermanagementComponent } from "./home_page/usermanagement/usermanagement.component";
import { ClassmanagementComponent } from './home_page/classmanagement/classmanagement.component';
import { AuthModule } from "./auth/auth.module";
import { UsersComponent } from './home_page/users/users.component';
import { ClassescComponent } from "./home_page/classesc/classesc.component";
import { ClasseseditComponent } from "./home_page/classesedit/classesedit.component";
import { MyaccountComponent } from './home_page/myaccount/myaccount.component';
import { MyreservationsComponent } from "./home_page/myreservations/myreservations.component";
import { AdminaccountComponent } from './home_page/adminaccount/adminaccount.component';
import { ReservationcalendarComponent } from './home_page/reservationcalendar/reservationcalendar.component';
import { TableFilterPipe } from "./home_page/reservationcalendar/table-filter.pipe";
import { ArraySortPipe } from "./home_page/reservationcalendar/sort.pipe";
import { CheckreservationComponent } from './home_page/checkreservation/checkreservation.component';
import { CheckreservationuserComponent } from './home_page/checkreservationuser/checkreservationuser.component';
import { DietComponent } from './home_page/diet/diet.component';




const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMMM YYYY',
  },
  display: {
    dateInput: 'DD MMMM YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};



@NgModule({
  declarations: [
    MyaccountComponent,
    MyreservationsComponent,
    ClasseseditComponent,
    ClassescComponent,
    AppComponent,
    AboutComponent,
    ClassesComponent,
    ContactComponent,
    SchedulesComponent,
    HeaderComponent,
    BannerComponent,
    ReservationsComponent,
    UsermanagementComponent,
    ClassmanagementComponent,
    LoginComponent,
    SignupComponent,
    UsersComponent,
    MyaccountComponent,
    AdminaccountComponent,
    ReservationcalendarComponent,
    TableFilterPipe,
    ArraySortPipe,
    CheckreservationComponent,
    CheckreservationuserComponent,
    DietComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatDatepickerModule,
    MatMenuModule,
    NgbModule,
    AngularMaterialModule,
    HttpClientModule,
    MatNativeDateModule,
    MatGridListModule,
    RouterModule,
    MatMomentDateModule,
    AuthModule,

  ],
  providers: [{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}],
  bootstrap: [AppComponent]
})
export class AppModule {}
