import { Component, OnInit } from '@angular/core';
import { ReservationsService } from "./../reservations/reservations.service";
import { Subscription } from "rxjs";
import * as _moment from 'moment';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation } from '../reservations/reservation.model';
import { Class } from "../../class.model";
import { ClassService } from './../classmanagement/class.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from "@angular/router";
import { ActivatedRoute, ParamMap } from "@angular/router";
const moment = _moment;


@Component({
  selector: 'app-reservationcalendar',
  templateUrl: './reservationcalendar.component.html',
  styleUrls: ['./reservationcalendar.component.css']
})
export class ReservationcalendarComponent implements OnInit {

  isLoading = false;
  ngSelect : string;
  userId: string;
  reservation: Reservation;
  reservations: Reservation[] =[];
  class: Class;
  classes: Class[] = [];
  totalReservations = 0;
  private mode = "create";
  private reservationId: string;
  private reservationsSub: Subscription;
  totalClasses = 0;
  private classId: string;
  private classesSub: Subscription;
  unique : any[] = [];
  uniquedate : any[] = [];
  program: string ;
  time: string ;
  date = null;
  selDate: string;
  selDay: string;
  selMonth: string;
  selYear: string;
  selectedDate = moment();




  constructor(public reservationsService: ReservationsService,
              public authService: AuthService,
              public classesService: ClassService,
              private router: Router ) {}

    ngOnInit(): void {
      this.ngSelect = '';
      this.isLoading = true;
      this.reservationsService.getReservations();
      this.reservationsSub = this.reservationsService
        .getReservationUpdateListener()
        .subscribe((reservationData: { reservations: Reservation[]; reservationCount: number }) => {
          this.isLoading = false;
          this.totalReservations = reservationData.reservationCount;
          this.reservations = reservationData.reservations;
          this.isLoading = false;
          this.uniquedate = [...new Set(this.reservations.map(item => item.date))];


        });
      this.classesService.getClasses();
      this.userId = this.authService.getUserId();
      this.classesSub = this.classesService
        .getClassUpdateListener()
        .subscribe((classData: { classes: Class[]; classCount: number }) => {
          this.isLoading = false;
          this.totalClasses = classData.classCount;
          this.classes = classData.classes;
          this.isLoading = false;
          this.unique = [...new Set(this.classes.map(item => item.classname))];

          //μοναδικα προγραμματα
        });

    }
    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      this.date = moment(event.value);
      this.selDate = this.date.format('DD');
      this.selDay = this.date.format('dddd');
      this.selMonth = this.date.format('MMMM');
      this.selYear = this.date.format('YYYY');
    }
    onDelete(ResId: string) {
      this.isLoading = true;
      this.reservationsService.deleteReservation(ResId).subscribe({
        next: ()  => {
          window.alert("Reservation was deleted!")
          this.router.navigate(["/adminaccount"]);
      }, error: ()=> {
        window.alert("Sthng happened! Please contact the creator.");
        this.isLoading = false;
      }
      });
    }
}
