import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from "rxjs";
import { CouponPopup } from "../coupon-popup/coupon-popup.component";
import { Reservation } from "../reservations/reservation.model";
import { ReservationsService } from "../reservations/reservations.service";

@Component({
  selector: "app-diet",
  templateUrl: "./diet.component.html",
  styleUrls: ["./diet.component.css"],
})
export class DietComponent implements OnInit {
  dietForm: FormGroup;
  private reservationsSub: Subscription;
  reservations: Reservation[] = [];
  totalReservations = 0;
  userId: string;
  mu = 0;
  mn = 0;
  mov = 0;
  mob = 0;


  constructor(public dialog: MatDialog, private fb: FormBuilder, public router: Router,
    public reservationsService: ReservationsService, public authService: AuthService) { }

  ngOnInit(): void {
    this.openDialog();
    this.createForm();
    this.getReservation();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CouponPopup, {
      panelClass: ["animate__animated", "animate__slideInDown"],
      minWidth: "550px",
      minHeight: "400px"
    });
  }

  createForm() {
    this.dietForm = this.fb.group({
      age: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
    })
  }

  getReservation() {
    this.userId = this.authService.getUserId();
    this.reservationsService.getReservationsById(this.userId);
    this.reservationsSub = this.reservationsService
      .getReservationUpdateListener()
      .subscribe((reservationData: { reservations: Reservation[]; reservationCount: number }) => {
        this.totalReservations = reservationData.reservationCount;
        this.reservations = reservationData.reservations;
        this.getTotalReservation()
      });
  }



  getTotalReservation() {
    // get today date
    let todayDate = new Date();
    // get one month back date
    let oneMonthBackDate = new Date();
    oneMonthBackDate.setMonth(oneMonthBackDate.getMonth() - 1);

    // filter reservation 
    const confirmedReservation = this.reservations.filter((item: any) => {
      // converting  item  date into date format
      const splitDate = item.date.split("/");
      const month = splitDate[1] - 1;
      const day = splitDate[0];
      const year = splitDate[2];
      const reservationDate = new Date(year, month, day);
      console.log(reservationDate)
      // date convertion end

      return item.confirmed === "YES" && reservationDate.getTime() >= oneMonthBackDate.getTime() &&
        reservationDate.getTime() <= todayDate.getTime();
    });
    this.totalReservations = confirmedReservation.length;
  }

  onSubmit() {
    if (this.dietForm.invalid) {
      return
    }
    const redirectPage = this.generateDiet();
    const url = `dietplans/${redirectPage}`
    this.router.navigate([url]);

  }

  // return a string for redirecting user to diet page
  generateDiet() {
    let age = this.dietForm.value.age;
    let weight = this.dietForm.value.weight;
    let height = this.dietForm.value.height;

    let bmi = (weight) / (height * height);


    if (bmi >= 20 && bmi < 22) {
      this.mn = 0;
      this.mu = 0;
      this.mob = 1;
      this.mov = 1;
    }


    if (this.mu > 0 && this.mn > 0) return "diet1"
    // if (this.mu > 0 && this.mn > 0) return "diet2"
    return "diet3"
  }


}
