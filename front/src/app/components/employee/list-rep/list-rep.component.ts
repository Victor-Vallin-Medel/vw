import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { ReparacionService } from 'src/app/services/reparacion.service';
import { RefaccionService } from 'src/app/services/refaccion.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Reparacion } from 'src/app/models/reparacion';
import { Refaccion } from 'src/app/models/refaccion';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ChartOptions, ChartType } from 'chart.js';
import { randomColor } from "randomcolor";
import { Label } from 'ng2-charts';
import { Location } from '@angular/common';

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

  public pieChartLegend = true;
  public pieChartType: ChartType = 'pie';
  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartColors: [{ backgroundColor }];

  fetchingMonth: boolean = true;
  selectedMonth: number = 1;
  months_name: string [] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor(public session: SessionService, public rep$: ReparacionService, private location: Location) { }

  ngOnInit() {
    this.rep$.getRefsWithRep().subscribe((partial: RepAndRefs []) => {
      partial.forEach(r => r.parser = JSON.parse(r.descripcion));

      this.isLoading = false;
      this.dataSource = new MatTableDataSource(partial);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.getChartOfMonth(1);
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

  goBack() {
    this.location.back();
  }

}
