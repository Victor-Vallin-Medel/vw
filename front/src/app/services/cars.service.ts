import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserCar } from '../models/usercar';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  readonly URL: string = 'http://192.168.33.10/automoviles';

  /* List (Array), Current (Interface) para mostrar en las vistas */
  list: Observable<Car []>;
  current: Observable<Car>;
  
  car$: BehaviorSubject<Car> = new BehaviorSubject<Car>(null);
  cars$: BehaviorSubject<Car []> = new BehaviorSubject<Car []>([]);

  constructor(private http:HttpClient) { }

  getDistincts() {
    return this.http.get<{ nombre: string [], version: string [], modelo: string []}>(`${this.URL}/vista/distinct`);
  }

  /**
   * Cantidad de carros registrados del usuario.
   * @param uid number
   */  
  getNumberCarsClient(uid: number) {
    return this.http.get<{ cantidad: number }>(`${this.URL}/cantidad/?idusuario=${uid}`);
  }

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
   * Read all cars.
   *  @param route string
   */
  getCars(route: string) {
    return this.http.get<Car [] | [{}]>(`${this.URL}${route}`).subscribe((partial: Car []) => {
      this.cars$.next(partial);
      this.list = this.cars$.asObservable();
    });
  }

  /**
   * Return all cars observable.
   * @param route string
   */
  getCarsOf(route: string): Observable<Car [] | UserCar []> {
    return this.http.get<Car [] | UserCar []>(`${this.URL}${route}`);
  }

  /**
   * Read one car.
   * @param numserie number
   */
  getCar(numserie: string) {
    return this.http.get<Car>(`${this.URL}/?numserie=${numserie}`).subscribe((partial: Car) => {
      this.car$.next(partial);
      this.current = this.car$.asObservable();
    });
  }

  /**
   * Create a car.
   * @param carDto Car
   */
  postCar(carDto: any) {
    return this.http.post(`${this.URL}/?idusuario=${carDto.usuario_idusuario}`, carDto);
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
