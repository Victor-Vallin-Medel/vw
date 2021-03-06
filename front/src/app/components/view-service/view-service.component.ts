import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog } from '@angular/material';
import { Car } from '../../models/car';
import { HojaService } from '../../services/order.service';
import { Observable } from 'rxjs';
import { Hoja } from 'src/app/models/hoja';
import { SetsheetComponent } from '../employee/setsheet/setsheet.component';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css']
})
export class ViewServiceComponent implements OnInit {

  @Input() order: Hoja;
  @Output() reload = new EventEmitter<boolean>();
  // order: Observable<{}>;

  constructor(public orderService: HojaService, private sheetInfo: MatDialog) {
    // this.order = this.orderService.getOrderAlive(car.idautomovil);
  }

  ngOnInit() {
  }

  openSheetInfo(order: Hoja) {
    const modal = this.sheetInfo.open(SetsheetComponent, { data: order, width: '450px', autoFocus: false });
    
    modal.afterClosed().subscribe(() => this.reload.emit(true));
  }

}
