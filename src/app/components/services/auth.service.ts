import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map, throwError, catchError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

	private authorization: String = `/oauth/oauth/token`;
	private link_creat_login: String = `/core/login`;
	private urlBase: String = `http://localhost:8765`;

	constructor(private http: HttpClient, private router: Router) {
	}

	public sign(payload: { email: string; password: string }): Observable<any> {
		const headers = {
			'Authorization': "Basic QVBJX05BTUVfQUNDRVNTOkFQSV9TRUNSRVRfQUNDRVNT",
			"Content-Type": "application/x-www-form-urlencoded",
		};
		const Params = new URLSearchParams();
		Params.set('grant_type', 'password');
		Params.set('username', payload.email);
		Params.set('password', payload.password);

		return this.http.post<{ access_token: string, expires_in: string, jti: string, token_type: string }>(`${this.urlBase}${this.authorization}`, Params.toString(), { headers }).pipe(
			map((res) => {
				localStorage.removeItem('access_token');
				localStorage.removeItem('token');
				localStorage.setItem('access_token', res.access_token);
				localStorage.setItem('token', res.access_token);

				return this.router.navigate(['dashboard']);
			}),
			catchError((e) => {
				if (e.error.message) return throwError(() => e.error.message);

				return throwError(
					() =>
						'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
				);
			})
		);
	}

	public logout() {
		localStorage.removeItem('access_token');
		return this.router.navigate(['']);
	}

	public isAuthenticated(): boolean {
		const token = localStorage.getItem('access_token');

		if (!token) return false;

		const jwtHelper = new JwtHelperService();
		return !jwtHelper.isTokenExpired(token);
	}

	public createNewUserLongin(payload : {email : string, name: string, password: string }): Observable<any> {
		const body = payload; 

		const headers = {
			'Content-Type': "application/json",
		};

		return this.http.post<any>(`${this.urlBase}${this.link_creat_login}`, body, { headers }).pipe(
			map((res) => {
				return this.router.navigate(['']);	
			}),
			catchError((e) => {
				if (e.error.message) return throwError(() => e.error.message);
				return throwError(
					() =>
						'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
				);
			})
		);
	}
}
