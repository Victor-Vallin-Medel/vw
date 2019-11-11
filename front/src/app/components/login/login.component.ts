import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginFormGroup: FormGroup;
  private signupFormGroup: FormGroup;

  constructor(private userService: SessionService, private router: Router, private _formBuilder: FormBuilder, private snack: MatSnackBar) { }

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
      rfcCtrl: ['', Validators.required],
      domCtrl: ['', Validators.required],
      phoneCtrl: ['', Validators.required],
    });
  }

  signInWithEmail() {
    let email: string = this.loginFormGroup.value.emailCtrl;
    let password: string = this.loginFormGroup.value.passwordCtrl;
    if(this.loginFormGroup.valid) {
      // this.afAuth.auth.signInWithEmailAndPassword(email, password)
      //   .then(
      //     user => {
      //       this.snack.open(`Bienvenido  ${user.user.email}`, "Close", {
      //         duration: 6000
      //       });
      //       this.router.navigate(['home']);
      //     },
      //     err => {
      //       this.snack.open(err.message, "Close", {
      //         duration: 4000
      //       });
      //     }
      //   );
    }
  }

  createUserWithEmail = () => {
    let email: string = this.signupFormGroup.value.emailCtrl;
    let password: string = this.signupFormGroup.value.passwordCtrl;
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
