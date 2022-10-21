import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { UserService } from "../usermanagement/user.service";
import { User } from "../../user.model";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Reservation } from '../reservations/reservation.model';
import { ReservationsService } from "./../reservations/reservations.service";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-checkreservationuser',
  templateUrl: './checkreservationuser.component.html',
  styleUrls: ['./checkreservationuser.component.css']
})
export class CheckreservationuserComponent implements OnInit {
   useremail: string;
  isLoading = false;
  yes: string = "YES";
  no: string = "NO";
  user: User;
  form: FormGroup;
  private reservationId: string;
  private reservationsSub: Subscription;
  reservation: Reservation;
  reservations: Reservation[] =[];
  totalReservations = 0;



  constructor(public route: ActivatedRoute,
    public usersService: UserService,
    private router: Router,
    private reservationsService: ReservationsService
    ) {
      }


  ngOnInit(): void {

    this.route.paramMap.subscribe(  (paramMap: ParamMap)  =>{
      if (paramMap.has('email')){
        this.useremail = paramMap.get('email');
      };
    });
    console.log(this.useremail);
    this.usersService.getUserbyEmail(this.useremail).subscribe( userData => {
      this.isLoading = false;
      this.user = {
        id: userData._id,
        password: userData.password,
        email: userData.email,
        username: userData.username,
        mobile: userData.mobile,
        role: userData.role
      };
      this.reservationsService.getReservationsById(this.user.id);
      this.reservationsSub = this.reservationsService
        .getReservationUpdateListener()
        .subscribe((reservationData: { reservations: Reservation[]; reservationCount: number }) => {
          this.isLoading = false;
          this.totalReservations = reservationData.reservationCount;
          this.reservations = reservationData.reservations;
          this.isLoading = false;

        });

    });
  }

  onConfirm(id:string, confirmed:string, useremail:string){

    console.log(id);
    this.reservationsService.updateReservation(id,confirmed,useremail);
  }

  onUnconfirm( id:string,confirmed:string, useremail:string){

    console.log(id);
    this.reservationsService.updateReservation(id,confirmed,useremail);
  }





  futureResfilter(reservations: Reservation[]): any[] {
    var today = new Date();
    return reservations.filter( function(res) {
      const [day, month, year] = res.date.split('/'); ;
      const date = new Date(+year, +month-1 , +day);

      return (date >= today)

    }
   );
  }
  pastResfilter(reservations: Reservation[]): any[] {
    var today = new Date();
    return reservations.filter( function(res) {
      const [day, month, year] = res.date.split('/'); ;
      const date = new Date(+year, +month-1 , +day);

      return (date <= today)

    }
   );
  }


}
