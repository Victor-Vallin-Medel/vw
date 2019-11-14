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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent implements OnInit {

  notService: number = 0;
  Auto: Car [] = [];
  orders: Order [] = [];
  displayedColumns: string[] = ['fk_plates_car', 'dateReception', 'time', ];
  
  constructor(private session: SessionService, private carService: CarsService, private orderService: OrderService, private sheetService: MatBottomSheet, private sheetCarService: MatBottomSheet, private router: Router) {
    
  }

  ngOnInit() {
    // this.session.onAuthStateChanged(user => {
    //   if (user) {
    //     this.orderService.getUserOrders(user.uid).subscribe((orders: Order []) => this.orders = orders);
    //     this.carService.getCars(user.uid).subscribe((cars: Car []) => {
    //       this.Auto = cars
    //       cars.forEach(car => {
    //         if (car.status != 0) {
    //           this.notService++;
    //         }
    //       })
    //     });
    //   }
    // });
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
