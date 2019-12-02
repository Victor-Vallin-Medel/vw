import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CarsService } from '../../../services/cars.service';
import { SessionService } from 'src/app/services/session.service';
import { Car } from 'src/app/models/car';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;

  get formArray(): AbstractControl | null { return this.registerFormGroup.get('formArray'); }

  private copy: Car [];
  private copy_name: string;
  public nameList: string [];
  public versionList: string [];
  public modelList: number [];

  constructor(public _formBuilder: FormBuilder, private session: SessionService, public car$: CarsService, private snack: MatSnackBar, private dialogRef: MatDialogRef<RegisterComponent>) {
    this.registerFormGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          nameCtrl: ['', Validators.required],
          serialCtrl: ['', Validators.required]
        }),
        this._formBuilder.group({ versionCtrl: ['', Validators.required] }),
        this._formBuilder.group({ modelCtrl: ['', Validators.required] })
      ])
    });
    console.log(this.registerFormGroup);
  }

  ngOnInit() {
    this.car$.getCarsOf("").subscribe((partial: Car []) => {
      this.copy = partial;
      this.nameList = [ ...new Set(this.copy.map((car: Car) => car.nombre)) ];

      this.car$.car$.next(partial[0]);
      this.car$.current = this.car$.car$.asObservable();
    });
  }

  filtering(value: string, form: number) {
    switch (form) {
      case 1:
        this.copy_name = value;
        this.versionList = [ ...new Set(this.copy.filter((car: Car) => car.nombre == value).map(c => c.version)) ];
        break;
      case 2:
        this.modelList = [ ...new Set(this.copy.filter((car: Car) => car.nombre == this.copy_name && car.version == value).map(c => c.modelo)) ];
      default:
        break;
    }
  }

  registerNewCar() {
    let nombre = this.registerFormGroup.value.formArray[0].nameCtrl;
    let numserie = this.registerFormGroup.value.formArray[0].serialCtrl;
    let version = this.registerFormGroup.value.formArray[1].versionCtrl;
    let modelo = parseInt(this.registerFormGroup.value.formArray[2].modelCtrl);

    const car = this.copy.find((car: Car) => car.nombre == nombre && car.version == version && car.modelo == modelo);

    this.car$.postCar({
      usuario_idusuario: this.session.user.idusuario,
      automovil_idautomovil: car.idautomovil,
      numserie: numserie
    }).subscribe(
      res => {
        this.dialogRef.close();
        this.snack.open("¡Vehículo registrado!", "Close", {
          duration: 8000
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.snack.open(error.error.error, "Close", {
          duration: 8000
        });
      }
    );
  }

}
