import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router,UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

   constructor(private authService: AuthService, private router: Router) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    
  //   return this.authService.isAuthenticated();
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('user')) {
      // logged in so return true
      return true;
    }
    else {
      // not logged in so redirect to login page with the return url
      //this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    
      this.router.navigate(['/pages/login']);
      return false;
    }
  }
}

