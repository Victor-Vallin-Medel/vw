import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { CarsService } from '../../services/cars.service';
import { Car } from '../../models/car';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history-service',
  templateUrl: './history-service.component.html',
  styleUrls: ['./history-service.component.css']
})
export class HistoryServiceComponent implements OnInit {

  car: Observable<{}>;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public order: Order, private carService: CarsService) {
    this.car = this.carService.getCar(this.order.fk_plates_car);
  }

  ngOnInit() {
  }

}
