import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SessionService } from 'src/app/services/session.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[];
  dataSource: MatTableDataSource<User>;

  constructor(public session: SessionService, public user$: UserService, private location: Location, public router: Router, private snack: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    if (this.router.url == '/employees') {
      this.displayedColumns = ['nombre', 'email', 'rol', 'actions'];
      this.setDataSource("empleados");
    }
    else if (this.router.url == '/customers'){
      this.displayedColumns = ['nombre', 'email', 'calle', 'actions']
      this.setDataSource("clientes");
    }
  }

  setDataSource(type: string) {
    this.user$.getUsersOf(type).subscribe((partial: User[]) => {
      this.dataSource = new MatTableDataSource(partial.filter(user => user.idusuario != this.session.user.idusuario));

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

  deleteEmployee(uid: number) {
    this.user$.deleteUser(uid).subscribe(
      partial => {
        this.snack.open(`Empleado eliminado.`, 'Cerrar', {
          duration: 8000,
        });
        this.setDataSource();
      },
      error => this.snack.open(`Ocurrió un error.`, 'Cerrar', {
        duration: 8000,
      })
    );
  }

}