import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl + '/api/Authenticate/register', JSON.stringify(credentials), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl + '/api/Authenticate/login', JSON.stringify(credentials), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }



  storeToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  storeUserId(token: string) {
    localStorage.setItem('userId', token);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');

  }
}
