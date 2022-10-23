import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CouponPopup } from "../coupon-popup/coupon-popup.component";
import { reservationPerWeek, staticData } from "./staticData";

@Component({
  selector: "app-diet",
  templateUrl: "./diet.component.html",
  styleUrls: ["./diet.component.css"],
})
export class DietComponent implements OnInit {
  dietForm: FormGroup;
  reservationList: Array<reservationPerWeek> = staticData;
  sumCoefficent: any;

  constructor(public dialog: MatDialog, private fb: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.openDialog();
    this.createForm();
    this.calculateCoefficient();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CouponPopup, {
      panelClass: ["animate__animated", "animate__slideInLeft"]
    });
  }

  createForm() {
    this.dietForm = this.fb.group({
      age: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
    })
  }


  calculateCoefficient() {
    this.sumCoefficent = this.getSum(this.reservationList, "totalCount", "multipler");
    console.log("sum of coefficent", this.sumCoefficent);
  }

  getSum(list, key, multiplerKey) {
    return list.reduce(function (a, b) {
      console.log(b[multiplerKey], b[key])
      return a + b[multiplerKey] * b[key];
    }, 0)
  }

  onSubmit() {
    if (this.dietForm.invalid) {
      return
    }
    const redirectPage = this.generateDiet();
    const url = `mydiet/${redirectPage}`
    this.router.navigate([url]);

  }

  // return a string for redirecting user to diet page
  generateDiet() {
    let age = this.dietForm.value.age;
    let weight = this.dietForm.value.weight;
    let height = this.dietForm.value.height;

    if (age >= 18 && age < 25 && weight < 70 && height < 150 && this.sumCoefficent > 2) return "diet1"
    if (age >= 25 && age < 30 && weight < 90 && height < 170 && this.sumCoefficent > 3) return "diet2"
    return "diet3"
  }
}
