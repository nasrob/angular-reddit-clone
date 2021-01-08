import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError } from 'rxjs';
import { LoginRequestPayload } from '../login/login.request.payload';
import { LoginResponse } from '../login/login.response.payload';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  private apiUrl: string = 'http://localhost:8080/api/auth';

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any>{
    return this.httpClient.post(this.apiUrl + '/signup', signupRequestPayload, {responseType: 'text'})
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(this.apiUrl + '/login', loginRequestPayload)
    .pipe(
      map((data: LoginResponse) => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);

        this.loggedIn.emit(true);
        this.username.emit(data.username);
        return true;
      })
    );
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>(this.apiUrl + '/refresh/token',
            this.refreshTokenPayload)
            .pipe(tap(response => {
              this.localStorage.clear('authenticationToken');
              this.localStorage.clear('expiresAt');

              this.localStorage.store('authenticationToken', response.authenticationToken);
              this.localStorage.store('expiresAt', response.expiresAt);
            }));
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  logout() {
    this.httpClient.post(this.apiUrl + '/logout', this.refreshTokenPayload,
                    {responseType: 'text'})
                    .subscribe(data => console.log(data),
                              error => throwError(error));
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }
}
