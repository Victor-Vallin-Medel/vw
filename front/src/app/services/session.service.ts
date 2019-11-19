import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, } from 'rxjs';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt/src/jwthelper.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class SessionService {

	public user: User;
	public isLoggedIn: Observable<boolean>;
	private behaviorUser: BehaviorSubject<User>;

	constructor(private http: HttpClient, private jwt: JwtHelperService, private router: Router) {
		this.behaviorUser = new BehaviorSubject<User>(null);
	}

	// FIXME: Crear función con servidor real.
	login(): Promise<{ token: string }> {
		return this.http.get<{ token: string }>("http://localhost:3004/auth").toPromise();
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
		let payload: User = { ...this.jwt.decodeToken() };
		return (payload.rol != "cliente");
	}

	onAuthState(): Observable<User> {
		let payload: User = { ...this.jwt.decodeToken() };
		this.behaviorUser.next(payload);
		return this.behaviorUser.asObservable();
	}

}
