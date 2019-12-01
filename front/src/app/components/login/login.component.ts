import { Router } from '@angular/router';
import { MatSnackBar, MatSlideToggleChange } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { User } from 'src/app/models/user';
import { isNull } from 'util';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CiudadService } from 'src/app/services/ciudad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  signupFormGroup: FormGroup;

  employee: boolean = false;

  constructor(private session: SessionService, private userService: UserService, public city$: CiudadService, private router: Router, private _formBuilder: FormBuilder, private snack: MatSnackBar) { }

  ngOnInit() {
    this.city$.getCiudades();

    this.loginFormGroup = this._formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', Validators.required]
    });

    this.signupFormGroup = this._formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', Validators.required],
      nameCtrl: ['', Validators.required],
      apPatCtrl: ['', Validators.required],
      apMatCtrl: [''],
      roleCtrl: [2, Validators.required],
      calleCtrl: ['', Validators.required],
      colCtrl: ['', Validators.required],
      ciudadCtrl: ['', Validators.required],
      cpCtrl: ['', Validators.required],
    });
  }

  // Change the inputs to user type.
  changeBuilder() {
    const roleCtrl = this.signupFormGroup.get('roleCtrl');

    if (this.employee) {
      // Clear role value.
      roleCtrl.setValue('');
    }
    else {
      // Set default value to role.
      roleCtrl.setValue(2);
    }
  }

  setJwt(res: { jwt: string }) {
    // Check token.
    if (isNull(res.jwt) == false) {
      // Save token.
      localStorage.setItem('token', res.jwt);

      // Get User observable.
      this.session.onAuthState().subscribe((user: User) => {
        this.session.user = user;
        this.session.isLoggedIn = new BehaviorSubject<boolean>(true).asObservable();

        // Snack welcome.
        this.snack.open(`Bienvenido ${user.email}`, "Close", {
          duration: 6000
        });

        // Redirect
        this.router.navigate([(user.roles_idroles != 2) ? 'home' : 'dashboard']);
      })
    }
  }

  signInWithEmail() {
    let email: string = this.loginFormGroup.value.emailCtrl;
    let password: string = this.loginFormGroup.value.passwordCtrl;

    // Form valid.
    if(this.loginFormGroup.valid) {
      this.session.login(email, password).subscribe(
        (res: { jwt: string }) => this.setJwt(res),
        (err: HttpErrorResponse) => {
          this.snack.open(err.error.error, "Close", {
            duration: 4000
          });
        }
      )
    }
  }

  createUserWithEmail = () => {
    let email: string = this.signupFormGroup.value.emailCtrl;
    let password: string = this.signupFormGroup.value.passwordCtrl;

    this.userService.postUser({
      email: email,
      password: password,
      nombre: this.signupFormGroup.value.nameCtrl,
      apPat: this.signupFormGroup.value.apPatCtrl,
      apMat: this.signupFormGroup.value.apMatCtrl,
      roles_idroles: parseInt(this.signupFormGroup.value.roleCtrl),

      calle: this.signupFormGroup.value.calleCtrl,
      colonia: this.signupFormGroup.value.colCtrl,
      ciudades_idciudades: parseInt(this.signupFormGroup.value.ciudadCtrl),
      cp: parseInt(this.signupFormGroup.value.cpCtrl),
    })
      .subscribe(
        (res: { jwt: string }) => this.setJwt(res),
        (err: HttpErrorResponse) => this.snack.open(err.error.error, '', {
          duration: 6000
        })
      );
  }

}
