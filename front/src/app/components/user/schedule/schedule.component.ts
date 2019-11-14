import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { Car } from '../../../models/car';
import { CarsService } from '../../../services/cars.service';
import { OrderService } from '../../../services/order.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  scheduleFormGroup: FormGroup;

  cars: Car[] = [];
  minDate: Date = new Date();
  maxDate: Date = new Date(2020, 11, 31);
  hours: number [] = [8, 10, 12, 14, 16];
  
  dayFilter = (date: Date): boolean => date.getDay() != 0;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private _formBuilder: FormBuilder, private carService: CarsService, private orderService: OrderService, private snack: MatSnackBar, private session: SessionService, private dialogRef: MatDialogRef<ScheduleComponent>, changeDetRef: ChangeDetectorRef, media: MediaMatcher) {
    this.scheduleFormGroup = this._formBuilder.group({
      'dateCtrl': ['', Validators.required],
      'timeCtrl': ['', Validators.required],
      'carCtrl': ['', Validators.required],
      'observationCtrl': ['',]
    });

    // Para cambiar el modo de datePicker en el celular.
    this.mobileQuery = media.matchMedia('(max-width: 700px)');
    this._mobileQueryListener = () => changeDetRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if(user) {
    //     this.carService.getCars(user.uid).subscribe((userCars: Car []) => {
    //       this.cars = userCars;
    //     });
    //   }
    // });
  }

  registerNewService() {
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.orderService.postOrder({
    //       dateReception: new Date(this.scheduleFormGroup.value.dateCtrl),
    //       dateDelivery: null,
    //       observations: this.scheduleFormGroup.value.observationCtrl,
    //       time: this.scheduleFormGroup.value.timeCtrl,
    //       fk_plates_car: this.scheduleFormGroup.value.carCtrl,
    //       fk_client: user.uid,
    //       status: 2,
    //     }).subscribe(order => {
    //       this.dialogRef.close();
    //       this.snack.open("Cita de servicio agendada.", "Close", {
    //         duration: 8000
    //       });
    //     });
    //   }
    // });
  }

}
