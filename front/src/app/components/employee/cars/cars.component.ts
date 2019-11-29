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

  displayedColumns: string[] = ['nombre', 'version', 'modelo', 'num_serie'];
  dataSource: MatTableDataSource<Car>;

  constructor(public session: SessionService, public car$: CarsService, private location: Location, private router: Router) { }

  ngOnInit() {
    this.setDataSource();
  }

  setDataSource() {
    this.car$.getCarsOf().subscribe((partial: Car[]) => {
      this.dataSource =  new MatTableDataSource(partial);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
