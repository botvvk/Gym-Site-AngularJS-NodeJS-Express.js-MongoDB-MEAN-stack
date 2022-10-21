import { Component, OnInit } from '@angular/core';

import { Subscription } from "rxjs";
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation } from '../reservations/reservation.model';
import { ReservationsService } from "./../reservations/reservations.service";
import { Router } from "@angular/router";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-myreservations',
  templateUrl: './myreservations.component.html',
  styleUrls: ['./myreservations.component.css']
})
export class MyreservationsComponent implements OnInit {

  ResId: any;
  isLoading = false;
  userId: string;
  reservation: Reservation;
  reservations: Reservation[] =[];
  totalReservations = 0;

  private reservationId: string;
  private reservationsSub: Subscription;


  constructor(public route: ActivatedRoute,
    public reservationsService: ReservationsService,
              public authService: AuthService ,
              private router: Router) {}

    ngOnInit(): void {
      this.isLoading = true;
      this.userId = this.authService.getUserId();
      this.reservationsService.getReservationsById(this.userId);
      this.reservationsSub = this.reservationsService
        .getReservationUpdateListener()
        .subscribe((reservationData: { reservations: Reservation[]; reservationCount: number }) => {
          this.isLoading = false;
          this.totalReservations = reservationData.reservationCount;
          this.reservations = reservationData.reservations;
          this.isLoading = false;
        });


    }


    onDelete(ResId: string) {
      this.isLoading = true;
      this.reservationsService.deleteReservation(ResId).subscribe({
        next: ()  => {
          window.alert("Reservation was deleted!")
          this.router.navigate(["/myaccount"]);
      }, error: ()=> {
        window.alert("Sthng happened! Please contact the creator.");
        this.isLoading = false;
      }
      });
    }
}
