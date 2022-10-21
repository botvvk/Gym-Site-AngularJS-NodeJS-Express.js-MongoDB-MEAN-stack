import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}

//So time to guard some routes, we don't want to be able to
//access the new post or edit posts routes if we are not logged in.
//For that, we can use so-called route guards, a feature provided
//by the Angular router.

//If we return true here or a promise or an observable which eventually
//yields true, then the router willknow that the route which we were
//protecting is accessible, so that the user may access this. If you
//return false, the router will deny to go there.
