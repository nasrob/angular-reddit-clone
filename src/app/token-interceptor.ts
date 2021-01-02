import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { LoginResponse } from "./auth/login/login.response.payload";
import { AuthService } from "./auth/shared/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  isTokenRefreshing: boolean = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jwtToken: any = this.authService.getJwtToken();

    if (jwtToken) {
      return next.handle(this.addToken(request, jwtToken)).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          return this.handleAuthErrors(request, next);
        } else {
          return throwError(error);
        }
      }));
    }
    return next.handle(request);
  }

  handleAuthErrors(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: LoginResponse) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
          return next.handle(this.addToken(request, refreshTokenResponse.authenticationToken));
        })
      )
    } else {

    }
  }

  addToken(request: HttpRequest<any>, jwtToken: any) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer' + jwtToken)
    });
  }
}
