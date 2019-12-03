import { Component, OnInit, NgZone } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { HojaService } from 'src/app/services/order.service';
import { UpdateServiceComponent } from '../update-service/update-service.component';
import { CitaService } from 'src/app/services/cita.service';
import { Cita } from 'src/app/models/cita';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  orders: Order [];
  status = {
    espera: 0,
    recepcion: 0,
    reparando: 0,
    lavando: 0,
  }

  constructor(public date$: CitaService, private orderService: HojaService, private sheetService: MatBottomSheet, private router: Router) { }

  ngOnInit() {
    this.date$.getCitas();
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.orderService.getAllOrders().subscribe((orders: Order []) => {
    //       this.orders = orders;
    //       this.orders.sort((o1: Order, o2: Order) => {
    //         return (o1.dateReception == o2.dateReception) ?
    //           o2.time - o1.time : (o1.dateReception > o2.dateReception) ?
    //             -1 : 1;
    //       });
    //       this.orders.forEach((order: Order) => {
    //         switch (order.status) {
    //           case 2:
    //             this.status.espera++;
    //             break;
    //           case 3:
    //             this.status.recepcion++;
    //             break;
    //           case 4:
    //             this.status.reparando++;
    //             break;
    //           case 5:
    //             this.status.lavando++;
    //             break;
    //           default:
    //             break;
    //         }
    //       })
    //     });
    //   }
    // })
  }

  openService(cita: Cita) {
    const ref = this.sheetService.open(UpdateServiceComponent, {
      data: cita
    });

    ref.afterDismissed().subscribe(() => {
      this.status = {
        espera: 0,
        recepcion: 0,
        reparando: 0,
        lavando: 0,
      }
      this.ngOnInit()
    });
  }

}
