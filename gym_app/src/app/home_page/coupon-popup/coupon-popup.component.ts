import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-coupon-popup",
  templateUrl: "./coupon-popup.component.html",
  styleUrls: ["./coupon-popup.component.css"],
})
export class CouponPopup implements OnInit {
  isAnimate: true;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  close() {
    document
      .getElementsByClassName("animate__animated")[0]
      .classList.remove("animate__slideInDown");
    document
      .getElementsByClassName("animate__animated")[0]
      .classList.add("animate__slideOutDown");
    setTimeout(() => {
      this.dialog.closeAll();
    }, 1000);
  }
}
