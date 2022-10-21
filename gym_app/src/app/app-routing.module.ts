import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './home_page/about/about.component';
import { ClassesComponent } from './home_page/classes/classes.component';
import { SchedulesComponent } from './home_page/schedules/schedules.component';
import { ContactComponent } from './home_page/contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BannerComponent } from './home_page/banner/banner.component';
import { UsermanagementComponent } from "./home_page/usermanagement/usermanagement.component";
import { ReservationsComponent } from './home_page/reservations/reservations.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { ClassmanagementComponent } from './home_page/classmanagement/classmanagement.component';
import { UsersComponent } from './home_page/users/users.component';
import { ClassescComponent } from './home_page/classesc/classesc.component';
import { ClasseseditComponent } from './home_page/classesedit/classesedit.component';
import { MyaccountComponent } from './home_page/myaccount/myaccount.component';
import { MyreservationsComponent } from './home_page/myreservations/myreservations.component';
import { AdminaccountComponent } from './home_page/adminaccount/adminaccount.component';
import { ReservationcalendarComponent } from './home_page/reservationcalendar/reservationcalendar.component';
import { CheckreservationComponent } from './home_page/checkreservation/checkreservation.component';
import { CheckreservationuserComponent } from './home_page/checkreservationuser/checkreservationuser.component';
import { DietComponent } from './home_page/diet/diet.component';

const routes: Routes = [
  { path: '', component: BannerComponent },
  { path: 'about',component:AboutComponent },
  { path: 'allclasses', component: ClassesComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'adminaccount', component: AdminaccountComponent,canActivate:[RoleGuard,AuthGuard],  data:{role:'Admin'}  },
  { path: 'checkreservation', component: CheckreservationComponent,canActivate:[RoleGuard,AuthGuard],  data:{role:'Admin'}  },
  { path: 'checkreservation/:email', component: CheckreservationuserComponent,canActivate:[RoleGuard,AuthGuard],  data:{role:'Admin'}  },
  { path: 'myaccount', component: MyaccountComponent,canActivate:[AuthGuard]},
  { path: 'mydiet', component: DietComponent ,canActivate:[AuthGuard]},
  { path: 'reservations', component: ReservationsComponent,canActivate:[AuthGuard]},
  { path: 'myreservations', component: MyreservationsComponent,canActivate:[AuthGuard]},
  { path: 'reservationcalendar', component: ReservationcalendarComponent,canActivate:[RoleGuard,AuthGuard]},
  { path: 'usermanagement',component: UsermanagementComponent,canActivate:[RoleGuard,AuthGuard],  data:{role:'Admin'} },
  { path: 'classmanagement', component: ClassmanagementComponent,canActivate:[RoleGuard,AuthGuard],data:{role:'Admin'}  },
  { path: 'users/:userId', component: UsersComponent, canActivate:[RoleGuard,AuthGuard], data:{role:'Admin'}  },
  { path: 'classes/:classId', component: ClasseseditComponent, canActivate:[RoleGuard,AuthGuard], data:{role:'Admin'}  },
  { path: 'createclass', component: ClassescComponent, canActivate:[RoleGuard,AuthGuard], data:{role:'Admin'}  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers:[ AuthGuard,RoleGuard]
})
export class AppRoutingModule {}
