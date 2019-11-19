import { Router } from '@angular/router';
import { MatSnackBar, MatSlideToggleChange } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { User } from 'src/app/models/user';
import { isNull } from 'util';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginFormGroup: FormGroup;
  private signupFormGroup: FormGroup;

  private employee: boolean = false;

  constructor(private session: SessionService, private router: Router, private _formBuilder: FormBuilder, private snack: MatSnackBar) { }

  ngOnInit() {
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
      roleCtrl: ['cliente', Validators.required],
      calleCtrl: ['', Validators.required],
      colCtrl: ['', Validators.required],
      ciudadCtrl: ['', Validators.required],
      cpCtrl: ['', Validators.required],
    });
  }

  // Change the inputs to user type.
  changeBuilder() {
    const calleCtrl = this.signupFormGroup.get('calleCtrl');
    const colCtrl = this.signupFormGroup.get('colCtrl');
    const ciudadCtrl = this.signupFormGroup.get('ciudadCtrl');
    const cpCtrl = this.signupFormGroup.get('cpCtrl');
    const roleCtrl = this.signupFormGroup.get('roleCtrl');

    if (this.employee) {
      calleCtrl.setValidators(null);
      colCtrl.setValidators(null);
      ciudadCtrl.setValidators(null);
      cpCtrl.setValidators(null);

      // Clear role value.
      roleCtrl.setValue('');
    }
    else {
      calleCtrl.setValidators([Validators.required]);
      colCtrl.setValidators([Validators.required]);
      ciudadCtrl.setValidators([Validators.required]);
      cpCtrl.setValidators([Validators.required]);

      // Set default value to role.
      roleCtrl.setValue('cliente');
    }

    calleCtrl.updateValueAndValidity();
    colCtrl.updateValueAndValidity();
    ciudadCtrl.updateValueAndValidity();
    cpCtrl.updateValueAndValidity();
  }

  signInWithEmail() {
    let email: string = this.loginFormGroup.value.emailCtrl;
    let password: string = this.loginFormGroup.value.passwordCtrl;

    // Form valid.
    if(this.loginFormGroup.valid) {
      this.session.login().then(
        res => { // Success
          // Check token.
          if (isNull(res.token) == false) {
            // Save token.
            localStorage.setItem('token', res.token);

            // Get User observable.
            this.session.onAuthState().subscribe((user: User) => {
              this.session.user = user;
              this.session.isLoggedIn = new BehaviorSubject<boolean>(true).asObservable();

              // Snack welcome.
              this.snack.open(`Bienvenido ${user.email}`, "Close", {
                duration: 6000
              });

              // Redirect
              this.router.navigate([(user.rol != 'cliente') ? 'home' : 'dashboard']);
            })
          }
        },
        err => {
          this.snack.open(err.message, "Close", {
            duration: 4000
          });
        }
      )
    }
  }

  createUserWithEmail = () => {
    let email: string = this.signupFormGroup.value.emailCtrl;
    let password: string = this.signupFormGroup.value.passwordCtrl;
    console.log(this.signupFormGroup.value.roleCtrl);
    // this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
    //   res => {
    //     this.userService.setClient({
    //       email: res.user.email,
    //       name: this.signupFormGroup.value.nameCtrl,
    //       apPat: this.signupFormGroup.value.apPatCtrl,
    //       apMat: this.signupFormGroup.value.apMatCtrl,
    //       rfc: this.signupFormGroup.value.rfcCtrl,
    //       phone: this.signupFormGroup.value.phoneCtrl,
    //       domicile: this.signupFormGroup.value.domCtrl,
    //       ref: res.user.uid
    //     }, res.user.uid).subscribe(response => {
    //       this.snack.open(`Bienvenido  ${res.user.email}`, "Close", {
    //         duration: 6000
    //       });
    //       this.router.navigate(['home']);
    //     });
    //   },
    //   error => {
    //     this.snack.open(error.message, "Close", {
    //       duration: 4000
    //     });
    //   }
    // );
  }

}
