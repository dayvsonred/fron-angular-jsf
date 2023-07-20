import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

//import auth service
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService : AuthService, public router: Router){
	}
canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['']);
        return false;
      }
    return true;
  }
}
