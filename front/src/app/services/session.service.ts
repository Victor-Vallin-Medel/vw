import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, } from 'rxjs';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt/src/jwthelper.service';

@Injectable({
	providedIn: 'root'
})
export class SessionService {

	public user: User;
	public isLoggedIn: Observable<boolean>;
	private behaviorUser: BehaviorSubject<User>;

	private readonly URL = "http://192.168.33.10/usuarios/login";

	constructor(private http: HttpClient, private jwt: JwtHelperService) {
		this.behaviorUser = new BehaviorSubject<User>(null);
	}

	login(email: string, password: string): Observable<{ jwt: string } | HttpErrorResponse> {
		const body = new HttpParams().set('email', email).set('password', password);

		return this.http.post<{ jwt: string }>(this.URL, body.toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
	}

	logout() {
		localStorage.removeItem('token');
	}

	isAuth(): string {
		return this.jwt.tokenGetter();
	}

	isExpired(): boolean {
		return this.jwt.isTokenExpired();
	}

	getTokenType(): boolean {
		// Return true if is employee, false otherwise.
		let payload = this.jwt.decodeToken();
		return (payload.data.roles_idroles != 2);
	}

	onAuthState() {
		let payload = this.jwt.decodeToken();
		
		if (payload != null)
			this.behaviorUser.next(payload.data);

		return this.behaviorUser.asObservable();
	}

}
