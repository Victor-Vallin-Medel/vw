import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  readonly URL: string = 'https://us-central1-volkswagen-6510d.cloudfunctions.net/app/api/cars/';

  constructor(private http:HttpClient) { }
  
  getCars(uid: string) {
    return this.http.get(`${this.URL}user/${uid}`);
  }

  getCar(id: string) {
    return this.http.get(`${this.URL}${id}`);
  }

  postCar(carDto: Car) {
    return this.http.post(`${this.URL}${carDto.plates}`, carDto);
  }

  deleteCar(id: string) {
    return this.http.delete(`${this.URL}${id}`);
  }

}
