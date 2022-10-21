import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { User } from "../../user.model";
import { UserService } from './user.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  isLoading = false;
  user: User;
  users: User[] = [];
  form: FormGroup;
  totalUsers = 0;
  private mode = "create";
  private userId: string;
  private usersSub: Subscription;


  constructor(public usersService: UserService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.usersService.getUsers();
    this.usersSub = this.usersService
      .getUserUpdateListener()
      .subscribe((userData: { users: User[]; userCount: number }) => {
        this.isLoading = false;
        this.totalUsers = userData.userCount;
        this.users = userData.users;
        this.isLoading = false;
      });
  }


  onCreateUser() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.usersService.createUser(
        this.form.value.email,
        this.form.value.username,
        this.form.value.password,
        this.form.value.mobile,
        this.form.value.role
      );
    } else {
      this.usersService.updateUser(
        this.userId,
        this.form.value.email,
        this.form.value.username,
        this.form.value.password,
        this.form.value.mobile,
        this.form.value.role
      );
    }
    this.form.reset();
  }



}
