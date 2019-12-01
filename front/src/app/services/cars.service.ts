import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  readonly URL: string = 'http://192.168.33.10/automoviles';

  /* List (Array), Current (Interface) para mostrar en las vistas */
  list: Observable<Car []>;
  current: Observable<Car>;
  
  cars$: BehaviorSubject<Car []> = new BehaviorSubject<Car []>([]);

  constructor(private http:HttpClient) { }
  
  /**
   * Read all client cars.
   * @param uid number
   */
  getClientCars(uid: number) {
    return this.http.get<Car []>(`${this.URL}/?idusuario=${uid}`).subscribe((partial: Car []) => {
      this.cars$.next(partial);
      this.list = this.cars$.asObservable();
    });
  }

  /**
   * Return all client cars observable.
   * @param uid number
   */
  getClientCarsOf(uid: number) {
    return this.http.get<Car []>(`${this.URL}/?idusuario=${uid}`);
  }

  /**
   * Return all cars observable.
   * @param route string
   */
  getCarsOf(route: string): Observable<Car [] | [{}]> {
    return this.http.get<Car [] | [{}]>(`${this.URL}${route}`);
  }

  /**
   * Read one car.
   * @param id number
   */
  getCar(id: number) {
    return this.http.get<Car>(`${this.URL}${id}`);
  }

  /**
   * Create a car.
   * @param carDto Car
   */
  postCar(carDto: Car) {
    return this.http.post(`${this.URL}`, carDto);
  }

  /**
   * Update a car.
   * @param id      number
   * @param status  number
   */
  putCar(id: number, status: number) {
    return this.http.put(`${this.URL}${id}`, { status: status});
  }

  /**
   * Delete a car.
   * @param id number
   */
  deleteCar(id: number) {
    return this.http.delete(`${this.URL}${id}`);
  }

}
