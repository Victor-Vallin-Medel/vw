import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../../services/cars.service';
import { Car } from "../../../models/car";
import { Order } from '../../../models/order';
import { HojaService } from '../../../services/order.service';
import { MatBottomSheet } from '@angular/material';
import { HistoryServiceComponent } from '../../history-service/history-service.component';
import { ViewServiceComponent } from '../../view-service/view-service.component';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent implements OnInit {

  orders: any [];
  isLoading: boolean = true;
  cantidad: number;
  orders2: Observable<any []>
  displayedColumns: string[] = ['fecha', 'nombre', 'version', 'modelo', 'numserie'];

  constructor(private session: SessionService, public car$: CarsService, public order$: HojaService, public user$: UserService, private sheetService: MatBottomSheet, private sheetCarService: MatBottomSheet, private router: Router) {

  }

  ngOnInit() {
    // this.orderService.getUserOrders(user.uid).subscribe((orders: Order[]) => this.orders = orders);
    // Get Client cars.
    this.car$.getClientCars(this.session.user.idusuario);
    this.car$.getNumberCarsClient(this.session.user.idusuario).subscribe((partial: { cantidad: number}) => {
      this.cantidad = partial.cantidad;
    });
    
    this.order$.getHojasUsuario(this.session.user.idusuario).subscribe((partial: any []) => {
      this.isLoading = false;

      this.orders = partial;
    });

    this.user$.getHojas(this.session.user.idusuario).subscribe((partial: any []) => {
      this.orders2 = new BehaviorSubject<any []>(partial).asObservable();
    });
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
