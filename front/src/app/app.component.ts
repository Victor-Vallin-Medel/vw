import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { RegisterComponent } from './components/client/register/register.component';
import { ScheduleComponent } from './components/client/schedule/schedule.component';
import { Client } from './models/client';
import { SessionService } from './services/session.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  isLoggedIn: Observable<boolean>; 
  behaviorLoggedIn: BehaviorSubject<boolean>;
  // FIXME: Remove definition
  currentClient: Client = { name: "Daniel", apPat: "Molina", email: "danmnvx@gmail.com", phone: "4492044278", ref: "1", rfc: "MOVC980210TS7", domicile: "X"}
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private router: Router, private session: SessionService, public dialogRegister: MatDialog, public dialogSchedule: MatDialog, changeDetRef: ChangeDetectorRef, media: MediaMatcher) {
    // Para cambiar el modo de Sidenav entre pantallas.
    this.mobileQuery = media.matchMedia('(max-width: 700px)');
    this._mobileQueryListener = () => changeDetRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.behaviorLoggedIn = new BehaviorSubject<boolean>(false);
  }

  ngOnInit() {
    this.behaviorLoggedIn.next(true);
    this.isLoggedIn = this.behaviorLoggedIn.asObservable();
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.behaviorLoggedIn.next(true);
    //     this.isLoggedIn = this.behaviorLoggedIn.asObservable();
    //     this.userService.getUser(user.uid).subscribe((client: Client) => this.currentClient = client);
    //   }
    //   else {
    //     this.behaviorLoggedIn.next(false);
    //     this.isLoggedIn = this.behaviorLoggedIn.asObservable();
    //   }
    // })
  }

  openDialog(type: string): void {
    switch (type) {
      case 'register':
        this.dialogRegister.open(RegisterComponent, {
          width: '600px'
        });
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
    // this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }
}
