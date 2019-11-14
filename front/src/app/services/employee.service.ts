import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly URL = 'https://us-central1-volkswagen-6510d.cloudfunctions.net/app/api/employees/';

  constructor(private http: HttpClient) { }

  pushEmployee(employeDto: Employee) {
    return this.http.post(`${this.URL}${employeDto.ref}`, employeDto);
  }

  getEmployees() {
    return this.http.get(`${this.URL}`);
  }

  getEmployee(uid: string) {
    return this.http.get(`${this.URL}${uid}`);
  }

  putEmployee(employeeDto: Employee) {
    return this.http.put(`${this.URL}${employeeDto.ref}`, employeeDto);
  }

  deleteEmployee(uid: string) {
    return this.http.delete(`${this.URL}${uid}`);
  }
}
