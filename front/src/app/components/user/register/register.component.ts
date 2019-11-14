import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarsService } from '../../../services/cars.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private registerFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private session: SessionService, private carService: CarsService, private snack: MatSnackBar, private dialogRef: MatDialogRef<RegisterComponent>) {
    this.registerFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      modelCtrl: ['', Validators.required],
      versionCtrl: ['', Validators.required],
      platesCtrl: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  registerNewCar() {
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.carService.postCar({
    //       name: this.registerFormGroup.value.nameCtrl,
    //       model: this.registerFormGroup.value.modelCtrl,
    //       version: this.registerFormGroup.value.versionCtrl,
    //       plates: this.registerFormGroup.value.platesCtrl,
    //       fk_client: user.uid,
    //       status: 0
    //     }).subscribe(car => {
    //       this.dialogRef.close();
    //       this.snack.open("¡Vehículo registrado!", "Close", {
    //         duration: 8000
    //       });
    //     });
    //   }
    // });
  }

}
