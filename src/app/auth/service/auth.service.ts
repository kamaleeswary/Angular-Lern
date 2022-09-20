import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';
import { environment } from '../../../environments/environment'

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private route: Router) { }

  onSignUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(err => {
      return this.handleError(err);
    }), tap(resData=> {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn)
    }))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(err => {
      return this.handleError(err);
    }),tap(resData=> {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn)
    }))
  }

  handleAuthentication(email: string, localId: string, idToken: string, expiresIn: string) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(+expiresIn*1000);
    localStorage.setItem('user', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      email: string,
      localId: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('user'));
    if(!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.localId, userData._token, new Date(userData._tokenExpirationDate));
    if(loadedUser.token) {
    this.user.next(loadedUser);
    const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
    }
  }

  handleError(err) {
    let errMsg = 'An unknown error occured'
    if (!err.error || !err.error.error) {
      return throwError(errMsg);
    }

    console.log(err.error.error)
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
          errMsg = 'This email is alreday exists';
          break;
      case 'EMAIL_NOT_FOUND':
          errMsg = 'This email is not exists, please Signup';
          break;
      case 'INVALID_PASSWORD':
          errMsg = 'Please enter the right passowrd';
          break;
    }
    return throwError(errMsg);
  }

  logout() {
    this.user.next(null);
    this.route.navigateByUrl('/auth');
    localStorage.removeItem('user');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }
}
