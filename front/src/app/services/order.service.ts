import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly URL: string = 'https://us-central1-volkswagen-6510d.cloudfunctions.net/app/api/orders/';

  constructor(private http: HttpClient) { }

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
