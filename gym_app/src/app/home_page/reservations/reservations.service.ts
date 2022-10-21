import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Reservation } from "./reservation.model";

import { environment } from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/reservations";

@Injectable({ providedIn: "root" })
export class ReservationsService {
  private reservations: Reservation[] = [];
  private reservationsUpdated = new Subject<{ reservations: Reservation[]; reservationCount: number }>();

  constructor(private http:HttpClient, private router: Router) {}

  getReservationUpdateListener() {
    return this.reservationsUpdated.asObservable();
  }


  getReservations() {
    this.http
      .get<{ reservations: any;maxReservations:number }>(
        BACKEND_URL
      ).pipe(
        map(reservationData => {
          return {
            reservations: reservationData.reservations.map(appointment => {
              return {
                id: appointment._id,
                userId: appointment.userId,
                program: appointment.program,
                date: appointment.date,
                day: appointment.day,
                time: appointment.time,
                confirmed: appointment.confirmed
              };
            }),
            maxReservations: reservationData.maxReservations
          };
        })
      )
      .subscribe(transformedReservationData => {
        this.reservations = transformedReservationData.reservations;
        this.reservationsUpdated.next({
          reservations: [...this.reservations],
          reservationCount: transformedReservationData.maxReservations
        });
      });
    }
    

    getCountRes() {
      this.http
        .get<{ reservations: any;maxReservations:number }>(
          BACKEND_URL +"/count"
        ).pipe(
          map(reservationData => {
            return {
              reservations: reservationData.reservations.map(appointment => {
                return {
                  id: appointment._id,
                  userId: appointment.userId,
                  program: appointment.program,
                  date: appointment.date,
                  day: appointment.day,
                  time: appointment.time,
                  confirmed: appointment.confirmed
                };
              }),
              maxReservations: reservationData.maxReservations
            };
          })
        )
        .subscribe(transformedReservationData => {
          this.reservations = transformedReservationData.reservations;
          this.reservationsUpdated.next({
            reservations: [...this.reservations],
            reservationCount: transformedReservationData.maxReservations
          });
        });
      }




    getReservationsById(userId:string) {
      this.http
        .get<{ reservations: any;maxReservations:number }>(
          BACKEND_URL+"/"+userId
        ).pipe(
          map(reservationData => {
            return {
              reservations: reservationData.reservations.map(reservation => {
                return {
                  id: reservation._id,
                  userId: reservation.userId,
                  program: reservation.program,
                  date: reservation.date,
                  day: reservation.day,
                  time: reservation.time,
                  confirmed: reservation.confirmed
                };
              }),
              maxReservations: reservationData.maxReservations
            };
          })
        )
        .subscribe(transformedReservationData => {
          this.reservations = transformedReservationData.reservations;
          this.reservationsUpdated.next({
            reservations: [...this.reservations],
            reservationCount: transformedReservationData.maxReservations
          });
        });
      }




  addReservation(userId: string ,program: string, date: string, day: string, time: string,
    useremail:string) {
    /*
    const reservationData = new FormData();
    reservationData.append("program", program);
    reservationData.append("date", date);
    reservationData.append("time", time );
    */
    const  resData = { id:null, userId: userId, program: program, date: date, day:day, time: time, confirmed: "NO",
    useremail:useremail}
    this.http
      .post<{ message: string; reservation: Reservation }>(
        BACKEND_URL,
        resData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updateReservation(id:string,confirmed:string, useremail:string){
    const resData =
     {id: id,
      userId: null ,
      program: null,
      date: null,
      day: null,
      time: null,
      confirmed: confirmed,
      useremail:useremail }
    console.log(resData)
    this.http
    .patch(BACKEND_URL, resData).subscribe({
      next: ()  => {
        window.alert("Reservation changed status! ")
        window.location.reload();
    }, error: ()=> {
      window.alert("Change on admin is prohibited! Please contact the creator.");
    }
    });
  }



  deleteReservation(ResId:string) {
    return this.http.delete(BACKEND_URL  +"/"+  ResId)
  }
}
