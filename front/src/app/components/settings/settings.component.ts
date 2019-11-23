import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatSnackBar, ErrorStateMatcher } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public edit = false;
  public generalFormGroup: FormGroup;
  public locationFormGroup: FormGroup;
  public securityFormGroup: FormGroup;

  public matcher = new MyErrorStateMatcher();

  constructor(public session: SessionService, public user$: UserService, private active: ActivatedRoute, private location: Location, private _formBuilder: FormBuilder, private snack: MatSnackBar, public router: Router) {
    this.generalFormGroup = this._formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      nombreCtrl: ['', Validators.required],
      apPatCtrl: ['', Validators.required],
      apMatCtrl: [''],
      rolCtrl: [''], //FIXME: Añadir controlador requerido en empleado.
    });

    this.locationFormGroup = this._formBuilder.group({
      calleCtrl: ['', Validators.required],
      coloniaCtrl: ['', Validators.required],
      ciudadCtrl: ['', Validators.required],
      cpCtrl: ['', Validators.required],
    });

    this.securityFormGroup = _formBuilder.group(
      {
        passwordCtrl: ['', Validators.required],
        confirmCtrl: ['']
      },
      {
        validator: this.checkPasswords
      }
    );
  }

  ngOnInit() {
    this.callUser();
  }

  /**
   * Set User Observable and get object.
   */
  callUser() {
    if (this.router.url == '/settings')
      this.user$.getUser(this.session.user.id);
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.passwordCtrl.value;
    let confirmPass = group.controls.confirmCtrl.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  goBack() {
    this.location.back();
  }

  /**
   * Update User info
   * @param group FromGroup
   * @param uid number
   */
  updateUser(group: FormGroup, uid: number) {
    let data, source = [];

    data = Object.assign({}, Object.entries(group.value).forEach(([name, value]) => {
      if (name != 'confirmCtrl')
        source[name.slice(0, name.length - 4)] = value;
    }));
    
    this.user$.putUser(data, uid);
    // FIXME: Call observable?. Set MD5(password)?
  }

  deleteEmployee() {
    // this.user$.deleteEmployee(this.employee.ref).subscribe((employee: User) => {
    //   this.snack.open(`${employee.name} ${employee.apPat} eliminado.`, 'Close', {
    //     duration: 8000,
    //   });
    //   this.location.back();
    // })
  }

}
