import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { CarsService } from 'src/app/services/cars.service';
import { UserService } from 'src/app/services/user.service';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { Cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/services/cita.service';
import { SessionService } from 'src/app/services/session.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit {

  car: Car;
  client: User;
  employee: Observable<{}>;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public cita: Cita, public session: SessionService, public date$: CitaService, public car$: CarsService, public user$: UserService, public router: Router, private sheetRef: MatBottomSheetRef, private snack: MatSnackBar) { }

  ngOnInit() {
    // this.carService.getCar(this.order.fk_plates_car).subscribe((car: Car) => this.car = car);
    // this.userService.getClient(this.order.fk_client).subscribe((client: User) => this.client = client);

    this.car$.getCar(this.cita.numserie);
    this.user$.getUser(this.cita.usuario_idusuario);
  }

  goToClient(uid: number) {
    this.sheetRef.dismiss();
    this.router.navigate(['/customer', uid]);
  }

  confirmService(status: number) {
    this.date$.patchCita(this.cita.idcitas).subscribe(
      (res) => {
        this.sheetRef.dismiss();
        this.snack.open("¡Cita confirmada!", 'Close', { duration: 6000 });
      },
      (err: HttpErrorResponse) => this.snack.open(err.error.error, 'Close', { duration: 6000 })
    )
    // console.log(status);
    // if (status == 6) {
    //   // this.carService.putCar(this.order.fk_plates_car, 0).subscribe();
    //   this.order.dateDelivery = new Date();
    // }
    // this.order.status = status;
    // this.orderService.updateService(this.order).subscribe((order: Order) => {
    //   this.snack.open(`Servicio actualizado.`, 'Close', {
    //     duration: 8000
    //   })
    //   this.sheetRef.dismiss();
    // })
  }

}
