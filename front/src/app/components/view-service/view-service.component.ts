import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { Car } from '../../models/car';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css']
})
export class ViewServiceComponent implements OnInit {

  order: Observable<{}>;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public car: Car, private sheetRef: MatBottomSheetRef, private orderService: OrderService) {
    this.order = this.orderService.getOrderAlive(car.idAutomovil);
  }

  ngOnInit() {
  }

}
