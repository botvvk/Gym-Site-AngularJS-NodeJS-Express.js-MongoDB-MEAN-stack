import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../../user.model";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { EmailValidator } from "@angular/forms";



const BACKEND_URL = environment.apiUrl + "/users";

@Injectable({ providedIn: "root" })
export class UserService {
private users: User[] = [];
private usersUpdated = new Subject<{ users: User[]; userCount: number }>();


constructor(private http: HttpClient, private router: Router) {}
getUserUpdateListener() {
  return this.usersUpdated.asObservable();
}

getUsers() {
  this.http
    .get<{ users: any;maxUsers:number }>(
      BACKEND_URL
    ).pipe(
      map(userData => {
        return {
          users: userData.users.map(user => {
            return {
              id: user._id,
              email: user.email,
              password: user.password,
              mobile: user.mobile,
              role: user.role
            };
          }),
          maxUsers: userData.maxUsers
        };
      })
    )
    .subscribe(transformedUserData => {
      this.users = transformedUserData.users;
      this.usersUpdated.next({
        users: [...this.users],
        userCount: transformedUserData.maxUsers
      });
    });
}

  getUser(id: string) {
  return this.http.get<{
    _id: string;
    email: string;
    username: string;
    password: string;
    mobile: string;
    role: string;
  }>(BACKEND_URL + "/"+ id);
}

getUserbyEmail(email: string) {
  return this.http.get<{
    _id: string;
    email: string;
    username: string;
    password: string;
    mobile: string;
    role: string;
  }>(BACKEND_URL + "/user/"+ email);
}

createUser( email: string, password: string, username: string, mobile: string, role: string)
{
  const userData = new FormData();
  userData.append('email',email)
  userData.append('password',password )
  userData.append('username', username)
  userData.append('mobile', mobile)
  userData.append('role', role)
  this.http.post(BACKEND_URL + "/signup", userData).subscribe({ next:() => {
    window.alert("User was created.");
  },
  error:() => {
    window.alert("ERROR...User was NOT created.");
    }
  }
  );
  window.location.reload();
 }


deleteUser(userId: string) {
  return this.http.delete(BACKEND_URL +"/"+ userId);
}


updateUser(id: string, email: string, password: string, username: string, mobile: string, role: string) {
  let userData: User | FormData;
  userData = {
    id: id,
    email: email,
    password: password,
    username: username,
    mobile: mobile,
    role: role
    };

  this.http
  .put(BACKEND_URL + "/"+ id, userData).subscribe({
    next: ()  => {
      window.alert("User was updated.")
      window.location.reload();
  }, error: ()=> {
    window.alert("Change on admin is prohibited! Please contact the creator.");
  }
  });
}




}
