import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { CarsService } from '../../../services/cars.service';
import { SessionService } from 'src/app/services/session.service';
import { CitaService } from 'src/app/services/cita.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  scheduleFormGroup: FormGroup;

  minDate: Date = new Date();
  maxDate: Date = new Date(2020, 11, 31);
  hours: number [] = [8, 10, 12, 14, 16];
  
  dayFilter = (date: Date): boolean => date.getDay() != 0;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private _formBuilder: FormBuilder, public car$: CarsService, private date$: CitaService, private snack: MatSnackBar, private session: SessionService, private dialogRef: MatDialogRef<ScheduleComponent>, changeDetRef: ChangeDetectorRef, media: MediaMatcher) {
    this.scheduleFormGroup = this._formBuilder.group({
      'dateCtrl': ['', Validators.required],
      'timeCtrl': ['', Validators.required],
      'carCtrl': ['', Validators.required],
    });

    // Para cambiar el modo de datePicker en el celular.
    this.mobileQuery = media.matchMedia('(max-width: 700px)');
    this._mobileQueryListener = () => changeDetRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.car$.getClientCars(this.session.user.idusuario);
  }

  registerNewService() {
    let time = this.scheduleFormGroup.value.timeCtrl;
    let numserie = this.scheduleFormGroup.value.carCtrl;
    let date = new Date(this.scheduleFormGroup.value.dateCtrl);

    let fecha = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), time));
    
    this.date$.postCita({
      fecha: fecha.toISOString().slice(0, 19).replace('T', ' '),
      confirmacion: 0,
      usuario_idusuario: this.session.user.idusuario,
      numserie: numserie
    })
    .subscribe(
      res => {
        this.dialogRef.close();
        this.snack.open("¡Cita registrada!", "Close", {
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
