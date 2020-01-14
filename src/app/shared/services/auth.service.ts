// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoginResponse } from '../models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // API path
  basePath = 'http://localhost:3000/users';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  loginForm(data): Observable<LoginResponse[]> {
    return this.http
      .get<LoginResponse[]>(`${this.basePath}?email=${data.email}&password=${data.password}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  getData(data): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.basePath, data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

}
