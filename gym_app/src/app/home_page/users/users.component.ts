import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { UserService } from "../usermanagement/user.service";
import { User } from "../../user.model";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private userId: string;
  isLoading = false;
  user: User;
  form: FormGroup;
  constructor(public route: ActivatedRoute,public usersService: UserService,  private router: Router) {
  }


  ngOnInit(): void {

    this.route.paramMap.subscribe(  (paramMap: ParamMap)  =>{
      if (paramMap.has('userId')){
        this.userId = paramMap.get('userId');
      };
    });
    this.usersService.getUser(this.userId).subscribe( userData => {
      this.isLoading = false;
      this.user = {
        id: userData._id,
        password: userData.password,
        email: userData.email,
        username: userData.username,
        mobile: userData.mobile,
        role: userData.role
      };
      console.log(this.user);
    });

  }
  onUpdate(form:NgForm){


    this.usersService.updateUser(
      this.userId,
      form.value.email,
      form.value.password,
      form.value.username,
      form.value.mobile,
      form.value.role
    );
  }

  onDelete(userId: string) {
    this.isLoading = true;
    this.usersService.deleteUser(userId).subscribe({
      next: ()  => {
        window.alert("User was deleted!")
        this.router.navigate(["/usermanagement"]);
    }, error: ()=> {
      window.alert("Change on admin is prohibited! Please contact the creator.");
      this.isLoading = false;
    }
    });
  }
}
