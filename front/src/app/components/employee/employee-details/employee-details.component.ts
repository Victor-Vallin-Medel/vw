import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee;
  private signupFormGroup: FormGroup;

  constructor(private userService: UserService, private active: ActivatedRoute, private location: Location, private _formBuilder: FormBuilder, private snack: MatSnackBar, private router: Router) {
    this.signupFormGroup = this._formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      nameCtrl: ['', Validators.required],
      apPatCtrl: ['', Validators.required],
      apMatCtrl: [''],
      roleCtrl: ['', Validators.required],
      domCtrl: ['', Validators.required],
      phoneCtrl: ['', Validators.required],
    });
  }

  ngOnInit() {
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.active.params.subscribe(params => {
    //       this.employeeService.getEmployee(params.id).subscribe((employee: Employee) => this.employee = employee);
    //     });
    //   }
    // });
  }

  goBack() {
    this.location.back();
  }

  updateEmployee() {
    this.userService.putEmployee(this.employee).subscribe((employee: Employee) => {
      this.snack.open(`${employee.name} ${employee.apPat} actualizado.`, 'Close', {
        duration: 8000
      });
    });
  }


  deleteEmployee() {
    this.userService.deleteEmployee(this.employee.ref).subscribe((employee: Employee) => {
      this.snack.open(`${employee.name} ${employee.apPat} eliminado.`, 'Close', {
        duration: 8000,
      });
      this.location.back();
    })
  }

}
