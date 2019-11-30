import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Ciudad } from '../models/ciudad';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private options = { headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded") };
  private readonly URL = 'http://192.168.33.10/ciudades';

  /* List (Array), Current (Interface) para mostrar en las vistas */
  list: Observable<Ciudad []> = new Observable<Ciudad []>(null);
  current: Observable<Ciudad>;
  
  list$: BehaviorSubject<Ciudad []> = new BehaviorSubject<Ciudad []>([]);
  current$: BehaviorSubject<Ciudad> = new BehaviorSubject<Ciudad>(null);

  constructor(private http: HttpClient) { }

  /**
   * Get ciudades.
   */
  getCiudades() {
    return this.http.get<Ciudad []>(`${this.URL}`).subscribe((partial: Ciudad []) => {
      this.list$.next(partial);
      this.list = this.list$.asObservable();
    });
  }
}
