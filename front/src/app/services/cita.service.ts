import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cita } from '../models/cita';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  readonly URL: string = 'http://192.168.33.10/citas';

  /* List (Array), Current (Interface) para mostrar en las vistas */
  list: Observable<Cita []>;
  current: Observable<Cita>;
  
  cita$: BehaviorSubject<Cita> = new BehaviorSubject<Cita>(null);
  citas$: BehaviorSubject<Cita []> = new BehaviorSubject<Cita []>([]);

  constructor(private http:HttpClient) { }

  /**
   * Create a date.
   * @param citaDto Cita
   */
  postCar(citaDto: Cita) {
    return this.http.post(`${this.URL}`, citaDto);
  }
}
