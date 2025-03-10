import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, SERVER_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  apiUrl = `${SERVER_URL}/jderest/tokenrequest`;

  constructor(private http: HttpClient) {
    console.log('Hello RestServiceProvider Provider');
  }

  retrieveToken(data: any): Promise<UserObject> {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiUrl, JSON.stringify(data), {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        })
        .subscribe(
          (data: UserObject) => {
            if (data.userInfo) {
              resolve(data);
            } else {
              reject(data);
            }
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
}

export interface UserObject {
  username?: string;
  environment?: string;
  role?: string;
  jasserver?: string;
  error?: { message?: string };
  userInfo?: {
    token?: string;
    langPref?: string;
    locale?: string;
    dateFormat?: string;
    dateSeperator?: string;
    simpleDateFormat?: string;
    decimalFormat?: string;
    addressNumber?: number;
    alphaName?: string;
    appsRelease?: string;
    country?: string;
    username?: string;
  };
}