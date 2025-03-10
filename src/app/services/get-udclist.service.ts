import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { SessionService } from './session.service';
import { ENVIRONMENT, SERVER_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetUdclistService {
  private apiFormReqUrl = `${SERVER_URL}/jderest/formservice`;

  constructor(private http: HttpClient, private sessionSrvc: SessionService) {}

  public getUDC(
    proCode: string,
    sysCode: string,
    qbeVal: string
  ): Observable<any> {
    qbeVal = `*${qbeVal}*`;
    console.log(
      'search UDC clicked for UDC ' + proCode + '|' + sysCode + '|' + qbeVal
    );
    const postdata: any = {
      formServiceAction: 'R',
      role: '*ALL',
      findOnEntry: 'FALSE',
      allowCache: false,
      deviceName: 'sdk_gphone_x86',
      formActions: [
        {
          controlID: '1[11]',
          value: qbeVal,
          command: 'SetQBEValue',
          '.type': 'com.oracle.e1.jdemf.FormAction',
        },
        {
          controlID: '16',
          value: proCode,
          command: 'SetControlValue',
          '.type': 'com.oracle.e1.jdemf.FormAction',
        },
        {
          controlID: '18',
          value: sysCode,
          command: 'SetControlValue',
          '.type': 'com.oracle.e1.jdemf.FormAction',
        },
        {
          controlID: '22',
          command: 'DoAction',
          '.type': 'com.oracle.e1.jdemf.FormAction',
        },
      ],
      ssoEnabled: false,
      '.type': 'com.oracle.e1.jdemf.FormRequest',
      formName: 'P0004A_W0004AA',
      returnControlIDs: '1[10,11]',
      formInputs: [],
      maxPageSize: '500',
      aliasNaming: true,
      token: this.sessionSrvc.getAccessToken(),
      environment: ENVIRONMENT,
    };

    // tslint:disable-next-line: max-line-length
    return this.http
      .post<Response>(this.apiFormReqUrl, JSON.stringify(postdata), {
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
    return throwError(error.error);
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
}
