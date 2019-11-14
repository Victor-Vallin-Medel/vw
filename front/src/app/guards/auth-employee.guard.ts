import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthEmployeeGuard implements CanActivate {

  constructor(private session: SessionService, private router: Router, private snack: MatSnackBar) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
      let promise = new Promise<boolean>((resolve, reject) => {
        this.session.checkAuth()
          .then(
            res => {
              if (res.PHPSESSID) {
                if (res.EMPLOYEE)
                  resolve(true);
                else {
                  this.snack.open("Vista no disponible.", "Close", {
                    duration: 3000
                  });
                  this.redirect(reject, 'dashboard');
                }
              }
              else
                this.redirect(reject);
            },
            err => this.redirect(reject)
          )
      });

      return promise;
  }

  redirect(reject: any, route: string = 'login'): void {
    reject();
    this.router.navigate([`/${route}`]);
  }
  
}
