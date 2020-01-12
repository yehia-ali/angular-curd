import { Injectable } from '@angular/core';
import { IUser } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: IUser[];
  apiUrl = 'http://localhost:3000/users';  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get(this.apiUrl, this.httpOptions).pipe(
      map((res: any[]) => {
        this.users = [];
        res.forEach(el => {
          const user = {
            id: el['id'],
            email: el['email'],
            first_name: el['first_name'],
            last_name: el['last_name'],
            avatar: el['avatar']
          };

          this.users.push(user);
        });

        return this.users;
      })
    );
  }  

  getUser(id: string) {
    const url = `${this.apiUrl}/${id}`;
    console.log(url);
    return this.http.get(url).pipe(
      map((res: IUser) => {
        return res;
      })
    );
  }
  

  addUser (user): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}`, user, this.httpOptions).pipe(
      tap((user: IUser) => console.log(`added User w/ id=${user.id}`)),
      catchError(this.handleError<IUser>('addUser'))
    );
  }


  updateUser (id, user): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, user, this.httpOptions).pipe(
      map((res: any[]) => {
         res;
      })
    );
  }
  
  deleteUser (id): Observable<IUser> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<IUser>(url, this.httpOptions).pipe(
      catchError(this.handleError<IUser>('delete user'))
    );
  };

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      console.error(error); // log to console instead
   
      return of(result as T);
    };
  
  }

}
