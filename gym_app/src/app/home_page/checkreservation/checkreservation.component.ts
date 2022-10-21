import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { UserService } from '../usermanagement/user.service';
import { Subscription } from "rxjs";
import { User } from "../../user.model";
import { ReservationsService } from "./../reservations/reservations.service";
import { Reservation } from '../reservations/reservation.model';
import { Router } from "@angular/router";


@Component({
  selector: 'app-checkreservation',
  templateUrl: './checkreservation.component.html',
  styleUrls: ['./checkreservation.component.css']
})
export class CheckreservationComponent implements OnInit {

  isLoading = false;
  show = false;
  email: string;
  link: string;
  user: User;
  users: User[] = [];
  totalUsers = 0;
  form: FormGroup;
  private usersSub: Subscription;
  reservation: Reservation;
  reservations: Reservation[] =[];
  totalReservations = 0;
  private mode = "create";
  private reservationId: string;
  private reservationsSub: Subscription;


  constructor(public usersService: UserService,
    public reservationsService: ReservationsService,  private router: Router) { }

  ngOnInit(): void {
  }


  ResCheck(form: NgForm) {
    this.link = "/checkreservation/" + form.value.email
    this.router.navigate([this.link] );

  }


}
