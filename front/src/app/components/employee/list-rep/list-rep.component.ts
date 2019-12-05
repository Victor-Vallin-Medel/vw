import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { ReparacionService } from 'src/app/services/reparacion.service';
import { RefaccionService } from 'src/app/services/refaccion.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Reparacion } from 'src/app/models/reparacion';
import { Refaccion } from 'src/app/models/refaccion';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { randomColor } from "randomcolor";
import { Label, Color } from 'ng2-charts';
import { Location } from '@angular/common';
import { HojaService } from 'src/app/services/order.service';

export interface RepAndRefs extends Reparacion {
  refacciones: Refaccion []
}

export interface RepByMonth {
  idreparaciones: number,
  cantidad: number,
  nombre: string
}

@Component({
  selector: 'app-list-rep',
  templateUrl: './list-rep.component.html',
  styleUrls: ['./list-rep.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListRepComponent implements OnInit {

  // Table properties
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isLoading: boolean = true;
  displayedColumns: string[] = ['nombre', 'descripcion', 'precio'];
  dataSource: MatTableDataSource<RepAndRefs>;

  expandedRep: RepAndRefs | null;

  // Chart properties
  public chartLegend = true;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  
  public pieChartType: ChartType = 'pie';
  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartColors: [{ backgroundColor }];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,210,0,0.3)',
          },
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'teal',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'teal',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  public lineChartColors: Color[];

  public lineChartType: ChartType = 'line';
  public lineChartLabels: Label[];
  public lineChartData: ChartDataSets[];

  fetchingTotal: boolean = true;
  fetchingMonth: boolean = true;
  selectedMonth: number = 1;
  months_name: string [] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor(public session: SessionService, public order$: HojaService,public rep$: ReparacionService, private location: Location) { }

  ngOnInit() {
    this.rep$.getRefsWithRep().subscribe((partial: RepAndRefs []) => {
      partial.forEach(r => r.parser = JSON.parse(r.descripcion));

      this.isLoading = false;
      this.dataSource = new MatTableDataSource(partial);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.getChartOfMonth(1);
    this.getChartOfTotal();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getChartOfMonth(month: number) {
    this.rep$.getDataMonth(month).subscribe((partial: RepByMonth[]) => {
      this.pieChartLabels = partial.map(r => r.nombre);
      this.pieChartData = partial.map(r => r.cantidad);
      this.fetchingMonth = false;
      this.pieChartColors = [
        { 
          backgroundColor: partial.map(() => randomColor({
            luminosity: 'dark',
            format: 'rgba',
            alpha: 0.5
          })),
        },
      ];
    });
    this.selectedMonth = month;
  }

  getChartOfTotal() {
    this.order$.getRepsTotal().subscribe((partial: any []) => {
      this.lineChartData = [{ data: partial.map(r => r.servicios), label: 'Totales' }];
      console.log(this.lineChartData);
      this.lineChartLabels = partial.map(r => this.months_name[r.mes - 1]);
      this.fetchingTotal = false;
      this.lineChartColors = [
        { // red
          backgroundColor: 'rgba(255,0,0,0.3)',
          borderColor: 'red',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
      ];
    });
  }

  goBack() {
    this.location.back();
  }

}
