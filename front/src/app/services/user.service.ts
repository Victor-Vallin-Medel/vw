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
  list: Observable<User []> = new Observable<User []>(null);
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

  /**
   * Get Users of given type.
   * @param type number 1 = Employees | 0 = Customers
   */
  getUsers(type: number) {
    // FIXME: Add filter with type.
    return this.http.get<User []>(`${this.URL}`).subscribe((partial: User []) => {
      this.list$.next(partial);
      this.list = this.list$.asObservable();
    });
  }

  /**
   * Get the Observable Users
   * @param type number 1 = Employees | 0 = Customers
   */
  getUsersOf(type: number) {
    // FIXME: Add filter with type.
    return this.http.get<User []>(`${this.URL}`);
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

  deleteUser(uid: number) {
    return this.http.delete(`${this.URL}${uid}`);
  }

  deleteEmployee(uid: string) {
    return this.http.delete(`${this.URL}${uid}`);
  }

  
}
