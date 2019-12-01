import { Component, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/services/cars.service';
import { Car } from 'src/app/models/car';
import { SessionService } from 'src/app/services/session.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columnsCat: string[] = ['nombre', 'version', 'modelo'];
  columnsReg: string[] = ['nombre', 'version', 'modelo', 'numserie'];

  dataCat: MatTableDataSource<Car>;
  dataReg: MatTableDataSource<Car>;

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

    this.car$.getCarsOf("/vista/registrados").subscribe((partial: Car[]) => {
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
