import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

export interface UserDTO {
  name?: string;
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Dynamic API URL based on environment
  private baseUrl = `${environment.apiUrl}/auth`;
  //
  constructor(private http: HttpClient) {}

  // Login
  login(user: UserDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  // Register
  register(user: UserDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  // Optional: save token in localStorage
  saveUserData(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  getUserData(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('user');
  }

}
