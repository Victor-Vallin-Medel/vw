import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class SessionService {

	user: User;

	constructor(private http: HttpClient) { }

	checkAuth(): Promise<any> {
    	return this.http.get<boolean>("http://localhost:3000/server/auth.php").toPromise();
	}
}
