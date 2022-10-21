import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title= "gymapp"
  userIsAuthenticated = false;
  userIsAdmin = false;

  private authListenerSubs: Subscription;
  private adminListenerSubs: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });


    this.userIsAdmin = this.authService.getIsAdmin();
    this.adminListenerSubs = this.authService
      .getAdminStatusListener()
      .subscribe(isAdmin => {
        this.userIsAdmin = isAdmin;
      });

  }


  onLogout() {
    this.authService.logout();
  }

  closeMenu(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var parent = target;
    var nav = null;
    if(!parent.classList.contains('main-nav')) {
      while(!parent.classList.contains('main-nav')) {
        if(parent.tagName == "HTML") {
          parent = null;
          break;
        }
        parent = parent.parentNode;
      }

      if(parent !== null) {
        nav = parent.querySelector('.nav');
        if(nav !== null) {
          nav.classList.remove('on')
        }
      }
    }
  }

  showMenu(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var parent = target;
    var nav = null;
    if(!parent.classList.contains('main-nav')) {
      while(!parent.classList.contains('main-nav')) {
        if(parent.tagName == "HTML") {
          parent = null;
          break;
        }
        parent = parent.parentNode;
      }

      if(parent !== null) {
        nav = parent.querySelector('.nav');
        if(nav !== null) {
          if(nav.classList.contains('on')) {
            nav.classList.remove('on')
          } else {
            nav.classList.add('on')
          }
        }
      }
    }
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.adminListenerSubs.unsubscribe();
  }
}
