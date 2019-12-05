import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Reparacion } from '../models/reparacion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReparacionService {

  readonly URL: string = 'http://192.168.33.10/reparaciones';

  /* List (Array), Current (Interface) para mostrar en las vistas */
  list: Observable<Reparacion []> = new Observable<Reparacion []>(null);
  current: Observable<Reparacion>;
  
  list$: BehaviorSubject<Reparacion []> = new BehaviorSubject<Reparacion []>([]);
  current$: BehaviorSubject<Reparacion> = new BehaviorSubject<Reparacion>(null);

  constructor(private http: HttpClient) { }

  /**
   * Obtener la lista de reparaciones.
   */
  getReparaciones() {
    return this.http.get<Reparacion []>(`${this.URL}`).subscribe((partial: Reparacion []) => {
      partial.forEach(r => r.parser = JSON.parse(r.descripcion));

      this.list$.next(partial);
      this.list = this.list$.asObservable();
    });
  }

  /**
   * Obtener observable de la lista de reparaciones.
   */
  getReparacionesOf() {
    return this.http.get<Reparacion []>(`${this.URL}`);
  }
}