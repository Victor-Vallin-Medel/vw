import { Injectable } from '@angular/core';
import { Refaccion } from '../models/refaccion';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RefaccionService {

  readonly URL: string = 'http://192.168.33.10/refacciones';

  /* List (Array), Current (Interface) para mostrar en las vistas */
  list: Observable<Refaccion []> = new Observable<Refaccion []>(null);
  current: Observable<Refaccion>;
  
  list$: BehaviorSubject<Refaccion []> = new BehaviorSubject<Refaccion []>([]);
  current$: BehaviorSubject<Refaccion> = new BehaviorSubject<Refaccion>(null);

  constructor(private http: HttpClient) {}

  getRefsInRep(uid: number) {
    return this.http.get<Refaccion []>(`${this.URL}/?idreparaciones=${uid}`).subscribe((partial: Refaccion []) => {
      this.list$.next(partial);
      this.list = this.list$.asObservable();
    });
  }

  getMax() {
    return this.http.get<any>(`${this.URL}/vista/max`);
  }

}
