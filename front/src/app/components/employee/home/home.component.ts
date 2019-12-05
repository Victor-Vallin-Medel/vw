import { Component, OnInit, NgZone } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { HojaService } from 'src/app/services/order.service';
import { UpdateServiceComponent } from '../update-service/update-service.component';
import { CitaService } from 'src/app/services/cita.service';
import { Cita } from 'src/app/models/cita';
import { SetsheetComponent } from '../setsheet/setsheet.component';
import { Hoja } from 'src/app/models/hoja';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(public date$: CitaService, public order$: HojaService, private sheetService: MatBottomSheet, private router: Router) { }

  ngOnInit() {
    this.date$.getCitas();
    this.order$.getHojas();
  }

  openService(cita: Cita) {
    const ref = this.sheetService.open(UpdateServiceComponent, {
      data: cita
    });

    ref.afterDismissed().subscribe(() => 
      this.ngOnInit());
  }

}
