import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private BACKEND_URL = 'https://chakra-backend-3783b443f623.herokuapp.com';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.BACKEND_URL}/api/users/login`,
      { email, password }
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.BACKEND_URL}/api/users/register`,
      { name, email, password }
    );
  }
}
