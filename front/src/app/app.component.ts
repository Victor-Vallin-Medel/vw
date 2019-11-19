import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { RegisterComponent } from './components/client/register/register.component';
import { ScheduleComponent } from './components/client/schedule/schedule.component';
import { SessionService } from './services/session.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './models/user';
import { CarsService } from './services/cars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';

  behaviorLoggedIn: BehaviorSubject<boolean>;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private router: Router, private session: SessionService, public car$: CarsService, public dialogRegister: MatDialog, public dialogSchedule: MatDialog, changeDetRef: ChangeDetectorRef, media: MediaMatcher) {
    // Para cambiar el modo de Sidenav entre pantallas.
    this.mobileQuery = media.matchMedia('(max-width: 700px)');
    this._mobileQueryListener = () => changeDetRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.behaviorLoggedIn = new BehaviorSubject<boolean>(false);
  }

  ngOnInit() {
    this.session.onAuthState().subscribe((user: User) => {
      if (user.id > 0) {
        this.session.user = user;
        this.behaviorLoggedIn.next(true);
      }
      else {
        this.session.user = null;
        this.behaviorLoggedIn.next(false);
      }
      this.session.isLoggedIn = this.behaviorLoggedIn.asObservable();
    });
  }

  openDialog(type: string): void {
    switch (type) {
      case 'register':
        const dialog = this.dialogRegister.open(RegisterComponent, {
          width: '600px'
        });
        dialog.afterClosed().subscribe(() => this.car$.getClientCars(this.session.user.id));
        break;
      case 'schedule':
        this.dialogSchedule.open(ScheduleComponent, {
          width: '600px'
        });
        break;

      default:
        break;
    }
  }

  logOut() {
    this.session.logout();
    this.behaviorLoggedIn.next(false);
    this.session.isLoggedIn = this.behaviorLoggedIn.asObservable();
    this.router.navigate(['login']);
  }
}
