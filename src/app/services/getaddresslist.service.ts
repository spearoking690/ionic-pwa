import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ENVIRONMENT, SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetaddresslistService {
  private apiFormReqUrl = `${SERVER_URL}/jderest/formservice`;

  constructor(private http: HttpClient, private sessionSrvc: SessionService) {}

  public searchAddress(searchType: string, qbeValue: string): Observable<any> {
    qbeValue = `*${qbeValue}*`;

    console.log('search Addresss clicked for Search type ' + searchType);
    const postdata: any = {
      formServiceAction: 'R',
      role: '*ALL',
      allowCache: true,
      deviceName: 'sdk_gphone_x86',
      formActions: [
        {
          controlID: '54',
          value: searchType,
          command: 'SetControlValue',
          '.type': 'com.oracle.e1.jdemf.FormAction',
        },
        {
          controlID: '1[20]',
          value: qbeValue,
          command: 'SetQBEValue',
          '.type': 'com.oracle.e1.jdemf.FormAction',
        },
        {
          controlID: '15',
          command: 'DoAction',
          '.type': 'com.oracle.e1.jdemf.FormAction',
        },
      ],
      ssoEnabled: false,
      '.type': 'com.oracle.e1.jdemf.FormRequest',
      formName: 'P01012_W01012B',
      returnControlIDs: '1[19,20]',
      formInputs: [],
      maxPageSize: '500',
      version: 'ZJDE0001',
      token: this.sessionSrvc.getAccessToken(),
      aliasNaming: true,
      environment: ENVIRONMENT,
    };

    // tslint:disable-next-line: max-line-length
    return this.http
      .post(this.apiFormReqUrl, JSON.stringify(postdata), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  public getName(addressNum: string): Observable<any> {
    console.log('search Addresss clicked for PersonID ' + addressNum);
    const postdata: any = {
      formServiceAction: 'R',
      role: '*ALL',
      allowCache: false,
      deviceName: 'sdk_gphone_x86',
      formActions: [
        {
          controlID: '1[7]',
          value: addressNum,
          command: 'SetQBEValue',
          '.type': 'com.oracle.e1.jdemf.FormAction',
        },
        {
          controlID: '13',
          command: 'DoAction',
          '.type': 'com.oracle.e1.jdemf.FormAction',
        },
      ],
      ssoEnabled: false,
      '.type': 'com.oracle.e1.jdemf.FormRequest',
      formName: 'P0101S_W0101SA',
      returnControlIDs: '1[7,8,25]',
      formInputs: [],
      token: this.sessionSrvc.getAccessToken(),
      aliasNaming: true,
      environment: 'JDV920',
    };

    // tslint:disable-next-line: max-line-length
    return this.http
      .post(this.apiFormReqUrl, JSON.stringify(postdata), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  

}
