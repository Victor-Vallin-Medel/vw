import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL = 'https://us-central1-volkswagen-6510d.cloudfunctions.net/app/api/employees/';

  constructor(private http: HttpClient) { }

  postClient(clientDTO: Client, uid: string) {
    return this.http.post(this.URL + `${uid}`, clientDTO);
  }

  pushEmployee(employeDto: Employee) {
    return this.http.post(`${this.URL}${employeDto.ref}`, employeDto);
  }

  getClients() {
    return this.http.get(`${this.URL}`);
  }

  getEmployees() {
    return this.http.get(`${this.URL}`);
  }

  getClient(uid) {
    return this.http.get(`${this.URL}${uid}`);
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
