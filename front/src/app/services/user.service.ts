import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL = 'http://localhost:3004/users/';

  constructor(private http: HttpClient) { }

  postClient(userDTO: User, uid: string) {
    return this.http.post(this.URL + `${uid}`, userDTO);
  }

  pushEmployee(userDto: User) {
    return this.http.post(`${this.URL}${userDto.id}`, userDto);
  }

  postUser(userDto: User) {
    return this.http.post(`${this.URL}`, userDto);
  }

  getUsers() {
    return this.http.get(`${this.URL}`);
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

  putEmployee(userDto: User) {
    return this.http.put(`${this.URL}${userDto.id}`, userDto);
  }

  deleteEmployee(uid: string) {
    return this.http.delete(`${this.URL}${uid}`);
  }

  
}
