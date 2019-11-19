import { Component, OnInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee [];

  constructor(private userService: UserService, private location: Location, private router: Router) { }

  ngOnInit() {
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.employeeService.getEmployees().subscribe((employees: Employee []) => this.employees = employees);
    //   }
    // });
  }

  goBack() {
    this.location.back();
  }

}
