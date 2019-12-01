import { Component, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/services/cars.service';
import { Car } from 'src/app/models/car';
import { SessionService } from 'src/app/services/session.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CarsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columnsCat: string[] = ['nombre', 'version', 'modelo'];
  columnsReg: string[] = ['nombre', 'version', 'modelo', 'numserie'];

  dataCat: MatTableDataSource<Car>;
  dataReg: MatTableDataSource<{}>;

  expandedCar: {} | null;

  constructor(public session: SessionService, public car$: CarsService, private location: Location, private router: Router) { }

  ngOnInit() {
    this.setDataSource();
  }

  setDataSource() {
    this.car$.getCarsOf("").subscribe((partial: Car[]) => {
      this.dataCat =  new MatTableDataSource(partial);

      this.dataCat.paginator = this.paginator;
      this.dataCat.sort = this.sort;
    });

    this.car$.getCarsOf("/vista/registrados").subscribe((partial: [{}]) => {
      this.dataReg =  new MatTableDataSource(partial);

      this.dataReg.paginator = this.paginator;
      this.dataReg.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataCat.filter = filterValue.trim().toLowerCase();
    this.dataReg.filter = filterValue.trim().toLowerCase();

    if (this.dataCat.paginator)
      this.dataCat.paginator.firstPage();
    if (this.dataReg.paginator)
      this.dataCat.paginator.firstPage();
  }

  goBack() {
    this.location.back();
  }

}
