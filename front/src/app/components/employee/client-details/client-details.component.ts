import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { Car } from 'src/app/models/car';
import { UserService } from 'src/app/services/user.service';
import { CarsService } from 'src/app/services/cars.service';
import { SessionService } from 'src/app/services/session.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['nombre', 'version', 'modelo', 'num_serie'];
  dataSource: MatTableDataSource<Car>;

  constructor(public session: SessionService, public user$: UserService, public car$: CarsService, private active: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
    this.setDataSource();
  }

  setDataSource() {
    this.active.params.subscribe(params => {
      this.user$.getUser(params.id);
      this.car$.getClientCarsOf(params.id).subscribe((partial: Car[]) => {
        this.dataSource = new MatTableDataSource(partial);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
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
