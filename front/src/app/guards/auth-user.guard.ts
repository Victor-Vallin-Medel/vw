import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';
import { MatSnackBar } from '@angular/material';
import { isNull } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {

  constructor(private session: SessionService, private router: Router, private snack: MatSnackBar) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
      let promise = new Promise<boolean>((resolve, reject) => {
        // Check if token exist.
        if (isNull(this.session.isAuth())) {
          this.redirect(reject);
        }
        else {
          // Check if token is expired.
          if (this.session.isExpired())
            this.redirect(reject);
          else {
            if (this.session.getTokenType() == false)
              resolve(true);
              // Check if user is client.
            else {
              this.snack.open("Vista no disponible.", "Close", {
                duration: 3000
              });
              this.redirect(reject, 'home');
            }
          }
        }
      });

      return promise;
  }

  redirect(reject: any, route: string = 'login'): void {
    reject();
    this.router.navigate([`/${route}`]);
  }
  
}
