import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL = 'http://localhost:3004/users/';

  /* List (Array), Current (Interface) para mostrar en las vistas */
  list: Observable<User []>;
  current: Observable<User>;
  
  list$: BehaviorSubject<User []> = new BehaviorSubject<User []>([]);
  current$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

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

  /**
   * 
   * @param uid number
   */
  getUser(uid: number) {
    return this.http.get<User>(`${this.URL}${uid}`).subscribe((partial: User) => {
      this.current$.next(partial);
      this.current = this.current$.asObservable();
    });
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

  /**
   * Update user info.
   * @param userDto any
   */
  putUser(userDto: any, uid: number) {
    return this.http.put<User>(`${this.URL}${uid}`, userDto).subscribe((partial: User) => {
      this.current$.next(partial);
      this.current = this.current$.asObservable();
    });
  }

  putEmployee(userDto: User) {
    return this.http.put(`${this.URL}${userDto.id}`, userDto);
  }

  deleteEmployee(uid: string) {
    return this.http.delete(`${this.URL}${uid}`);
  }

  
}
