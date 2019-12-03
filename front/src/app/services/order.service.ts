import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable, BehaviorSubject } from 'rxjs';
import { Hoja } from '../models/hoja';

@Injectable({
  providedIn: 'root'
})
export class HojaService {

  readonly URL: string = 'http://192.168.33.10/hojas';

  /* List (Array), Current (Interface) para mostrar en las vistas */
  list: Observable<Hoja []> = new Observable<Hoja []>(null);
  current: Observable<Hoja>;
  
  list$: BehaviorSubject<Hoja []> = new BehaviorSubject<Hoja []>([]);
  current$: BehaviorSubject<Hoja> = new BehaviorSubject<Hoja>(null);

  constructor(private http: HttpClient) { }

  /**
   * Obtener las hojas de servicio
   */
  getHojas() {
    return this.http.get<Hoja []>(`${this.URL}`).subscribe((partial: Hoja []) => {
      this.list$.next(partial);
      this.list = this.list$.asObservable();
    });
  }

  getAllOrders() {
    return this.http.get(`${this.URL}`);
  }

  getUserOrders(uid) {
    return this.http.get(`${this.URL}user/${uid}`);
  }

  getOrderAlive(id) {
    return this.http.get(`${this.URL}alive/${id}`);
  }

  postOrder(orderDto: Order) {
    return this.http.post(`${this.URL}`, orderDto);
  }

  updateService(orderDto: Order) {
    return this.http.put(`${this.URL}${orderDto.ref}`, orderDto);
  }
}
