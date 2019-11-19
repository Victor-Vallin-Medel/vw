import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../../services/cars.service';
import { Car } from "../../../models/car";
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { MatBottomSheet } from '@angular/material';
import { HistoryServiceComponent } from '../../history-service/history-service.component';
import { ViewServiceComponent } from '../../view-service/view-service.component';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent implements OnInit {

  orders: Order[] = [];
  displayedColumns: string[] = ['fk_plates_car', 'dateReception', 'time',];

  constructor(private session: SessionService, public car$: CarsService, private orderService: OrderService, private sheetService: MatBottomSheet, private sheetCarService: MatBottomSheet, private router: Router) {

  }

  ngOnInit() {
    // this.orderService.getUserOrders(user.uid).subscribe((orders: Order[]) => this.orders = orders);
    // Get Client cars.
    this.car$.getClientCars(this.session.user.id);
  }

  openOrderService(order: Order) {
    this.sheetService.open(HistoryServiceComponent, {
      data: order
    })
  }

  openCarService(car: Car) {
    this.sheetCarService.open(ViewServiceComponent, {
      data: car
    });
  }

}
