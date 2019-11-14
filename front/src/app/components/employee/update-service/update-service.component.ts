import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { CarsService } from 'src/app/services/cars.service';
import { ClientService } from 'src/app/services/client.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Car } from 'src/app/models/car';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit {

  car: Car;
  client: Client;
  employee: Observable<{}>;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public order: Order, private orderService: OrderService, private carService: CarsService, private clientService: ClientService, private employeeService: EmployeeService, private router: Router, private sheetRef: MatBottomSheetRef, private snack: MatSnackBar) {
    if (this.router.url == '/home') {
      // this.afAuth.auth.onAuthStateChanged(user => {
      //   if (user) {
      //     this.employee = this.employeeService.getEmployee(user.uid);
      //   }
      // })
    }
  }

  ngOnInit() {
    this.carService.getCar(this.order.fk_plates_car).subscribe((car: Car) => this.car = car);
    this.clientService.getClient(this.order.fk_client).subscribe((client: Client) => this.client = client);
  }

  goToClient() {
    this.sheetRef.dismiss();
    this.router.navigate(['/client', this.client.ref]);
  }

  updateService(status: number) {
    console.log(status);
    if (status == 6) {
      this.carService.putCar(this.order.fk_plates_car, 0).subscribe();
      this.order.dateDelivery = new Date();
    }
    this.order.status = status;
    this.orderService.updateService(this.order).subscribe((order: Order) => {
      this.snack.open(`Servicio actualizado.`, 'Close', {
        duration: 8000
      })
      this.sheetRef.dismiss();
    })
  }

}