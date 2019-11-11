import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentClient: Client;
  readonly URL: string = 'https://us-central1-volkswagen-6510d.cloudfunctions.net/app/api/clients/';

  constructor(private http: HttpClient) {  }

  setClient(clientDTO: Client, uid: string) {
    return this.http.post(this.URL + `${uid}`, clientDTO);
  }

  getUser(uid) {
    return this.http.get(`${this.URL}${uid}`);
  }
}
