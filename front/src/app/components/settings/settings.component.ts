import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatSnackBar, ErrorStateMatcher } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { CiudadService } from 'src/app/services/ciudad.service';

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

  public userCopy: User;

  public matcher = new MyErrorStateMatcher();

  constructor(public session: SessionService, public user$: UserService, public city$: CiudadService, private active: ActivatedRoute, private location: Location, private _formBuilder: FormBuilder, private snack: MatSnackBar, public router: Router) {
    this.generalFormGroup = this._formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      nombreCtrl: ['', Validators.required],
      apPatCtrl: ['', Validators.required],
      apMatCtrl: [''],
      roles_idrolesCtrl: [''], //FIXME: Añadir controlador requerido en empleado.
    });

    this.locationFormGroup = this._formBuilder.group({
      calleCtrl: ['', Validators.required],
      coloniaCtrl: ['', Validators.required],
      ciudades_idciudadesCtrl: ['', Validators.required],
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
    this.city$.getCiudades();
  }

  /**
   * Set User Observable and get object.
   */
  callUser() {
    if (this.router.url == '/settings')
      this.user$.getUser(this.session.user.idusuario);
    else
      this.active.params.subscribe(params => this.user$.getUser(params.id));
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
   * @param type number - 1= Gener, 2= Domicilio, 3=Password
   */
  updateUser(group: FormGroup, id: number, type: number) {
    let route: string = "";
    let data, source = [];

    switch (type) {
      case 2:
        route = "/direcciones"
        break;
    
      default:
        route = "";
        break;
    }

    Object.entries(group.value).forEach(([name, value]) => {
      if (name != 'confirmCtrl')
        source[name.slice(0, name.length - 4)] = value;
    })

    data = Object.assign({}, source);

    this.user$.patchUser(data, id, route).subscribe(
      (res) => this.snack.open('Usuario actualizado.', 'Close', { duration: 6000 }),
      (err: HttpErrorResponse) => {
        this.user$.current$.next(this.userCopy);
        this.user$.current = this.user$.current$.asObservable();

        this.snack.open(err.error.error, 'Close', { duration: 6000 })
      }
    );
    // FIXME: Call observable?. Set MD5(password)?
  }

  toggleEdit(current: User) {
    this.edit = !this.edit;
    this.userCopy = { ...current };
  }

  deleteEmployee(uid: number) {
    console.log(uid);
    this.user$.deleteUser(uid).subscribe(
      (partial) => {
        this.snack.open(`Empleado eliminado.`, 'Cerrar', {
          duration: 8000,
        });
        this.goBack();
      },
      (error: HttpErrorResponse) => this.snack.open(error.error.error, 'Cerrar', {
        duration: 8000,
      })
    );
  }

}
