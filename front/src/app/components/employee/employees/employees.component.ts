import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SessionService } from 'src/app/services/session.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['nombre', 'email', 'rol', 'actions'];
  dataSource: MatTableDataSource<User>;

  constructor(public session: SessionService, public user$: UserService, private location: Location, public router: Router, private snack: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.setDataSource();
  }

  setDataSource() {
    this.user$.getUsersOf(1).subscribe((partial: User[]) => {
      this.dataSource = new MatTableDataSource(partial.filter(user => user.id != this.session.user.id));
      console.log()
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

  editEmployee(user: User) {
    const dialogRef = this.dialog.open( EmployeeDetailsComponent, {
      width: '250px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
