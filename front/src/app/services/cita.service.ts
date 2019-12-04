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
   * Read one date.
   * @param uid number
   */
  getCita(uid: number) {
    return this.http.get<Cita>(`${this.URL}/${uid}`).subscribe((partial: Cita) => {
      console.log(partial);
      this.cita$.next(partial);
      this.current = this.cita$.asObservable();
    })
  }

  /**
   * Read dates
   */
  getCitas() {
    return this.http.get<Cita []>(`${this.URL}`).subscribe((partial: Cita []) => {
      this.citas$.next(partial);
      this.list = this.citas$.asObservable();
    });
  }

  /**
   * Create a date.
   * @param citaDto Cita
   */
  postCita(citaDto: Cita) {
    return this.http.post(`${this.URL}`, citaDto);
  }

  patchCita(uid: number) {
    return this.http.patch(`${this.URL}/${uid}`, { confirmacion: "1" });
  }
}
