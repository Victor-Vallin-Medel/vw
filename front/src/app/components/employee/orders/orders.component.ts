import { Component, OnInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { MatBottomSheet } from '@angular/material';
import { Router } from '@angular/router';
import { Chart } from "chart.js";
import { Order } from 'src/app/models/order';
import { HojaService } from 'src/app/services/order.service';
import { HistoryServiceComponent } from '../../history-service/history-service.component';

export interface dataDates {
  labels: string [],
  getMonth: number[],
  data: number [],
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  dates: any = [];
  orders: Order [];
  dataDates: dataDates = { labels: [], getMonth: [], data: [] };
  displayedColumns: string[] = ['fk_plates_car', 'dateReception', 'time',];

  constructor(private orderService: HojaService, private location: Location, private sheetService: MatBottomSheet, private router: Router) { }

  ngOnInit() {
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.orderService.getAllOrders().subscribe((orders: Order []) => {
    //       this.orders = orders;
    //       this.orders.sort((o1: Order, o2: Order) => {
    //         return (o1.dateReception == o2.dateReception)? 
    //           o2.time - o1.time : (o1.dateReception > o2.dateReception)? 
    //             -1 : 1;
    //       });
    //       this.orders.forEach(order => {
    //         let  month = new Date(order.dateReception).getMonth();
    //         if(!this.dataDates.getMonth.includes(month)) {
    //           this.dataDates.getMonth.push(month);
    //           this.dataDates.data.push(1);
    //         } else {
    //           let index = this.dataDates.getMonth.indexOf(month);
    //           this.dataDates.data[index]++;
    //         }
    //       });
    //       this.dataDates.getMonth.forEach(month => {
    //         switch (month) {
    //           case 0:
    //             this.dataDates.labels.push("Enero");
    //             break;
    //           case 1:
    //             this.dataDates.labels.push("Febrero");
    //             break;
    //           case 2:
    //             this.dataDates.labels.push("Marzo");
    //             break;
    //           case 3:
    //             this.dataDates.labels.push("Abril");
    //             break;
    //           case 4:
    //             this.dataDates.labels.push("Mayo");
    //             break;
    //           case 5:
    //             this.dataDates.labels.push("Junio");
    //             break;
    //           case 6:
    //             this.dataDates.labels.push("Julio");
    //             break;
    //           case 7:
    //             this.dataDates.labels.push("Agosto");
    //             break;
    //           case 8:
    //             this.dataDates.labels.push("Septiembre");
    //             break;
    //           case 9:
    //             this.dataDates.labels.push("Octubre");
    //             break;
    //           case 10:
    //             this.dataDates.labels.push("Noviembre");
    //             break;
    //           case 11:
    //             this.dataDates.labels.push("Diciembre");
    //             break;
    //         }
    //       });
          
    //       this.dates = new Chart('datesGraph', {
    //         type: 'doughnut',
    //         data: {
    //           labels: this.dataDates.labels,
    //           datasets: [{
    //             label: '# de Servicios',
    //             data: this.dataDates.data,
    //             backgroundColor: [
    //               '#444cf9',
    //               '#f0b060',
    //               '#2ebc53',
    //               '#6d2c66',
    //               '#0fc2c3',
    //               '#f42af0',
    //               '#5f8c84',
    //               '#b11700',
    //               '#170236',
    //               '#a7b2d1',
    //               '#0dbdb1',
    //               '#4a725b'
    //             ],
    //             borderWidth: 2
    //           }]
    //         },
    //         options: {
    //           title: {
    //             text: "Servicios por mes",
    //             display: false
    //           },
    //           scales: {
    //             yAxes: [{
    //               ticks: {
    //                 beginAtZero: true
    //               }
    //             }]
    //           }
    //         }
    //       });
    //     });


    //   }
    // });
  }

  goBack() {
    this.location.back();
  }

  openOrderService(order: Order) {
    this.sheetService.open(HistoryServiceComponent, {
      data: order
    })
  }

}
