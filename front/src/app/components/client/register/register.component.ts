import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarsService } from '../../../services/cars.service';
import { SessionService } from 'src/app/services/session.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private session: SessionService, private carService: CarsService, private snack: MatSnackBar, private dialogRef: MatDialogRef<RegisterComponent>) {
    this.registerFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      modelCtrl: ['', Validators.required],
      versionCtrl: ['', Validators.required],
      serialCtrl: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  registerNewCar() {
     // FIXME: Remover getCars function and id assing.
    this.carService.getCarsOf().subscribe((cars: Car []) => {
      let size = Object.keys(cars).length;

      this.carService.postCar({
        idAutomovil: size + 1,
        nombre: this.registerFormGroup.value.nameCtrl,
        modelo: this.registerFormGroup.value.modelCtrl,
        version: this.registerFormGroup.value.versionCtrl,
        num_serie: this.registerFormGroup.value.serialCtrl,
        Cliente_idCliente: this.session.user.id
      }).subscribe(
        car => {
          this.dialogRef.close();
          this.snack.open("¡Vehículo registrado!", "Close", {
            duration: 8000
          });
        },
        error => {
          this.snack.open(error, "Close", {
            duration: 8000
          });
        }
      );
    })
  }

}
