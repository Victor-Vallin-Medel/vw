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

  patchHoja(object: {}, uid: number) {
    return this.http.patch(`${this.URL}/${uid}`, object);
  }

  setRefs(uid: number, refs: number []) {
    return this.http.post(`${this.URL}/?idreparaciones=${uid}`, {
      reparaciones_idreparaciones : refs,
      hojaRecepcion_idhojaRecepcion: uid
    });
  }

  getByState(state: number) {
    return this.http.get<any []>(`${this.URL}/estado/${state}`);
  }

  getRepsTotal() {
    return this.http.get<any []>(`${this.URL}/servicios/mes`);
  }
}
