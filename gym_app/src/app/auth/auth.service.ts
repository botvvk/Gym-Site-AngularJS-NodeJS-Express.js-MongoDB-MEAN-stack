import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import { User } from ".././user.model";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/users";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private isAdmin = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  private adminStatusListener = new Subject<boolean>();
  user :User;
  // !: informs typescript not to worry about checking if varname might be unassigned
  // Push authentication information

  constructor(private http: HttpClient, private router: Router) {
    if (this.token){
     this.user = this.getUser(this.token);
    }
  }

  getToken() {
    return this.token;
  }
  //Γυρίζει το τοκεν

  getIsAuth() {
    return this.isAuthenticated;
  }
  //Γυρίζει το αν ειναι Authenticated.
  getIsAdmin() {
    return this.isAdmin;
  }
  getUserId() {
    return this.userId;
  }
  //Γυρίζει το UserId

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  //Γυρίζει το observable κομματι....αμα κανει Login θα παρει την τιμη True

  getAdminStatusListener() {
    return this.adminStatusListener.asObservable();
  }
  //Γυρίζει το observable κομματι....αμα κανει Login και ειναι admin θα παρει την τιμη True

  createUser(email: string, password: string, username: string, mobile: string, role: string) {
    const userData: User = {
       id: null,
       email: email,
       password: password,
       username: username,
       mobile: mobile,
       role: role};
    this.http.post<{}>(BACKEND_URL + "/signup", userData).subscribe({
      next:() => {
        this.router.navigate(["/"]);
      },
      error:() => {
        window.alert("Email already exists. Please log in or try again!");
        this.authStatusListener.next(false);
      }
    }
    );
  }
  //Δημιουργει έναν καινουργιο User μεσα στην βάση δεδομενων
  login(email: string, password: string) {
    const authData: AuthData = {  email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        BACKEND_URL + "/login",
        authData
      )
      .subscribe({
        next: response => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            this.user = this.getUser(token);
            if( this.user.role.includes('Admin') ) {
              this.adminStatusListener.next(true);
              this.isAdmin = true;
            }
            console.log(this.user)
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            console.log(this.user)
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(["/"]);
          }
        },
        error:(err: any) => {
          console.log( err.message)
          if ( err.message == ("Http failure response for http://localhost:4000/users/login: 401 Unauthorized"))
            window.alert("Password is wrong. Please try again!");
          if ( err.message == ("Http failure response for http://localhost:4000/users/login: 400 Bad Request"))
            window.alert("Email does not exist. Please try again!");
          this.authStatusListener.next(false);
        }
      });
  }
  //login

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.user = this.getUser(authInformation.token)
      this.isAdmin =this.user.role.includes('Admin')
      if (this.isAdmin){
        this.adminStatusListener.next(true);
      }
    }
  }
  //Επειδη έχουμε βαλει τα AUthdata στο local storage, θα ελεγχξουμε αμα δεν
  //εχει γινει expire το token, αν ισχυει τοτε θα γινει αυτοματη αυθεντικοποιηση

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.isAdmin = false;
    this.adminStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private getUser(token:string): User{
    return JSON.parse(atob(token.split('.')[1])) as User
  }
  //κανουμε decode το token οπου εχει μεσα το role,ετσι ωστε να μπορουμε να το
  //χρησιμοποιησουμε για guard σε συγκεκριμενα paths

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }
  //Βαζουμε τα AuthData στο localstorage

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}
