import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { SessionService } from './session.service';
import { ENVIRONMENT, SERVER_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppcallService {
  incDesc: string;
  severity: string;
  date: string;
  time: string;
  injuryill: string;
  security: string;
  secON: string;
  other: string;
  otherON: string;
  establ: string;
  location: string;
  //Expense Inquiry input variables------/
  displayMode: string;
  ereportType: string;
  //-------------------------------------/
  constructor(private http: HttpClient, private sessionSrvc: SessionService) {}

  privacyCase = ' ';
  eRoom = ' ';
  firstAid = ' ';
  senttoDoc = ' ';
  hospital = ' ';
  employee = ' ';
  contractor = ' ';
  party = ' ';
  incRole = ' ';
  environmentalImpact = ' ';
  nearMiss = ' ';
  excludefromSaftey = ' ';
  authoritiesNotified = ' ';
  motorVehicleInvolved = ' ';
  propertyEquipmentDamage = ' ';
  injuryDesc = ' ';
  personid = ' ';
  expense: any[];
 formData = new FormData();

  private apiFormReqUrl = `${SERVER_URL}/jderest/formservice`;
  private mediaObjectReqUrl = `${SERVER_URL}/jderest/v2/file/upload`;
  private expinquiryURL = `${SERVER_URL}/jderest/v3/orchestrator/LFS_ORCH_Expense_Inquiry`;

  public createIncident(): Observable<any> {
    if (this.sessionSrvc.getdate() !== undefined) {
      const dateT = this.sessionSrvc.getdate().split('T');
      this.date = dateT[0];
      const times = dateT[1].split('.');
      this.time = times[0];
    }

    if (this.sessionSrvc.getaddressBook() !== undefined) {
      this.establ = this.sessionSrvc.getaddressBook();
    } else {
      this.establ = ' ';
    }

    let i = 0;
    this.expense = new Array();
    for (const person of this.sessionSrvc.getExpenseList()) {
      if (this.sessionSrvc.getinjuryDescription() !== undefined) {
        this.injuryDesc = this.sessionSrvc.getinjuryDescription();
      } else {
        this.injuryDesc = ' ';
      }
      if (this.sessionSrvc.getpersonID() !== undefined) {
        this.personid = this.sessionSrvc.getpersonID();
      } else {
        this.personid = ' ';
      }

      this.expense.push({
        gridColumnEvents: [
          {
            value: this.privacyCase,
            columnID: '268',
            command: 'SetGridCellValue',
            '.type': 'com.oracle.e1.jdemf.GridColumnEvent',
          },
          {
            value: this.eRoom,
            columnID: '170',
            command: 'SetGridCellValue',
            '.type': 'com.oracle.e1.jdemf.GridColumnEvent',
          },
          {
            value: this.firstAid,
            columnID: '174',
            command: 'SetGridCellValue',
            '.type': 'com.oracle.e1.jdemf.GridColumnEvent',
          },
          {
            value: this.senttoDoc,
            columnID: '175',
            command: 'SetGridCellValue',
            '.type': 'com.oracle.e1.jdemf.GridColumnEvent',
          },
          {
            value: this.hospital,
            columnID: '171',
            command: 'SetGridCellValue',
            '.type': 'com.oracle.e1.jdemf.GridColumnEvent',
          },
          {
            value: this.employee,
            columnID: '67',
            command: 'SetGridCellValue',
            '.type': 'com.oracle.e1.jdemf.GridColumnEvent',
          },
          {
            value: this.contractor,
            columnID: '265',
            command: 'SetGridCellValue',
            '.type': 'com.oracle.e1.jdemf.GridColumnEvent',
          },
          {
            value: this.party,
            columnID: '90',
            command: 'SetGridCellValue',
            '.type': 'com.oracle.e1.jdemf.GridColumnEvent',
          },
          {
            value: this.incRole,
            columnID: '37',
            command: 'SetGridCellValue',
            '.type': 'com.oracle.e1.jdemf.GridColumnEvent',
          },
        ],
      });
      i += 1;
    }

    const postdata: any = {
      formServiceAction: 'U',
      role: '*ALL',
      deviceName: 'sdk_gphone_x86',
      formName: 'P54HS00_W54HS00B',
      returnControlIDs: '55',
      token: this.sessionSrvc.getAccessToken(),
      environment: ENVIRONMENT,
      formActions: [
        {
          controlID: '32',
          value: this.injuryill,
          command: 'SetCheckboxValue',
        },
        {
          controlID: '35',
          value: this.environmentalImpact,
          command: 'SetCheckboxValue',
        },
        {
          controlID: '30',
          value: this.nearMiss,
          command: 'SetCheckboxValue',
        },
        {
          controlID: '63',
          value: this.excludefromSaftey,
          command: 'SetCheckboxValue',
        },
        {
          controlID: '34',
          value: this.authoritiesNotified,
          command: 'SetCheckboxValue',
        },
        {
          controlID: '33',
          value: this.motorVehicleInvolved,
          command: 'SetCheckboxValue',
        },
        {
          controlID: '31',
          value: this.propertyEquipmentDamage,
          command: 'SetCheckboxValue',
        },
        {
          controlID: '67',
          value: this.incDesc,
          command: 'SetControlValue',
        },
        {
          controlID: '96_80',
          value: 'MOB',
          command: 'SetControlValue',
        },
        {
          controlID: '57',
          value: this.date,
          command: 'SetControlValue',
        },
        {
          controlID: '105',
          value: this.time,
          command: 'SetControlValue',
        },
        {
          controlID: '98',
          value: this.severity,
          command: 'SetControlValue',
        },
        {
          controlID: '36',
          value: this.secON,
          command: 'SetCheckboxValue',
        },
        {
          controlID: '93',
          value: this.security,
          command: 'SetControlValue',
        },
        {
          controlID: '39',
          value: this.otherON,
          command: 'SetCheckboxValue',
        },
        {
          controlID: '94',
          value: this.other,
          command: 'SetControlValue',
        },
        {
          controlID: '52_23',
          value: this.establ,
          command: 'SetControlValue',
        },
        {
          controlID: '52_26',
          value: this.location,
          command: 'SetControlValue',
        },
        {
          controlID: '52_34',
          value: '',
          command: 'SetControlValue',
        },
        {
          controlID: '52_36',
          value: '',
          command: 'SetControlValue',
        },
        {
          controlID: '52_44',
          value: '',
          command: 'SetControlValue',
        },
        {
          controlID: '52_42',
          value: '',
          command: 'SetControlValue',
        },
        {
          controlID: '52_47',
          value: '',
          command: 'SetControlValue',
        },
        {
          controlID: '52_49',
          value: '',
          command: 'SetControlValue',
        },
        {
          controlID: '11',
          command: 'DoAction',
        },
        {
          gridAction: {
            gridID: '49_33',
            gridRowInsertEvents: this.expense,
          },
        },
      ],
    };

    return this.http
      .post<Response>(this.apiFormReqUrl, JSON.stringify(postdata), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  public callexpenseInquiry(
    displayMode: string,
    eReportType: string
  ): Observable<any> {
    const postdata: any = {
      token: this.sessionSrvc.getAccessToken(),
      deviceName: 'sdk_gphone_x86',
      Display_Mode: displayMode,
      cExpenseReportType: eReportType,
    };

    return this.http
      .post<Response>(this.expinquiryURL, JSON.stringify(postdata), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // this.loading.dismiss();
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error.error.message);
  }

  private extractData(res: Response) {
    // this.loading.dismiss();
    const body = res;
    return body || {};
  }

  public addTextAttachment(incidentNum: string): Observable<any> {
    const postdata: any = {
      token: this.sessionSrvc.getAccessToken(),
      deviceName: 'sdk_gphone_x86',
      moStructure: 'GT54HS01B',
      moKey: [incidentNum],
      formName: 'P54HS07_S54HS07A',
      version: 'ZJDE0001',
      inputText: this.displayMode,
      appendText: 'false',
    };

    return this.http
      .post<Response>(this.mediaObjectReqUrl, JSON.stringify(postdata), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  public uploadPhoto(data:any): Observable<any> {
    const postdata: any = {
      token: this.sessionSrvc.getAccessToken(),
      deviceName: 'sdk_gphone_x86',
      moStructure: 'GT20120',
      moKey: [
        'T',
        '252',
        '538105',
        'VMJDLSJJ33',
        '20240420',
        '1.00',
        '1',
        '1.000',
      ],
      formName: 'P09E2011_W09E2011F',
      version: 'ZJDE0001',
      file: {
        fileName: 'test.jpg',
        itemName: 'test',
        sequence: 0,
      },
    };

       let formParams = new FormData();

       formParams.append('moAdd',new Blob([JSON.stringify(postdata)], { type: 'application/json' }));
       

         formParams.append('file', data);
    
let headers = new HttpHeaders();

headers = headers.append('Accept', 'application/json');

  return this.http.post<Response>(this.mediaObjectReqUrl, formParams, {headers: headers}).pipe(map(this.extractData), catchError(this.handleError));
  }
  
}
