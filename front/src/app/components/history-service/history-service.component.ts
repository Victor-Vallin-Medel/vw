import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HojaService } from 'src/app/services/order.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { RadialChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-history-service',
  templateUrl: './history-service.component.html',
  styleUrls: ['./history-service.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HistoryServiceComponent implements OnInit {

  // Table properties
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isLoading: boolean = true;
  displayedColumns: string[] = ['fecha', 'nombre', 'version', 'modelo', 'numserie'];
  dataSource: MatTableDataSource<any>;

  expandedOrder: any | null;

  // Chart properties
  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[];

  public radarChartData: ChartDataSets[];
  public radarChartType: ChartType = 'radar';

  fetchTotal: boolean = true;
  months_name: string [] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor(public order$: HojaService, public date$: CitaService, private location: Location) { }

  ngOnInit() {
    this.order$.getByState(6).subscribe((partial: any []) => {
      partial.forEach(o => o.observaciones = JSON.parse(o.observaciones));
      this.dataSource = new MatTableDataSource(partial);
      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.isLoading = false;
    });

    this.date$.getTotales().subscribe((partial: any[]) => {
      this.radarChartLabels = partial.map(r => this.months_name[r.mes - 1]);
      this.radarChartData = [{ data: partial.map(r => r.cantidad), label: "Totales" }];
      this.fetchTotal = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goBack() {
    this.location.back();
  }

}
