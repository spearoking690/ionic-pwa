import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import {
  NavController,
  AlertController,
  IonInfiniteScroll,
} from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { ViewChild } from '@angular/core';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { AppcallService } from 'src/app/services/appcall.service';
import { GetUdclistService } from 'src/app/services/get-udclist.service';

@Component({
  selector: 'app-expense-inquiry',
  templateUrl: './expense-inquiry.page.html',
  styleUrls: ['./expense-inquiry.page.scss'],
})
export class ExpenseInquiryPage implements OnInit {
  expQuery: Expensequery[];
  displayMode: string;
  datauser: any;
  addressNo1: any;
  name1: any;
  repType: string;
  private udcValue: string;
  private udcDescr: string;
  private displayString: string[];
  retAddNo: string;
  retDesc: string;
  inde = 0;
  exparr: Expensequery[];
  numTimesLeft = 25;
  private udc: UDC[];

  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;

  constructor(
    private storage: Storage,
    private router: Router,
    private loading: LoadingServiceService,
    private expInqAPI: AppcallService,
    private navCtrl: NavController,
    public sess: SessionService,
    private udcListSrvc: GetUdclistService,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.expQuery) {
      //this.expquerysearch();
    }
    
    this.repType = this.sess.getreportType();
    this.displayMode = this.sess.getdisplayMode();
  }

  add(){
    this.navCtrl.navigateForward(['expense-entry']);
  }

  getexpensequery(item: any) {
    this.sess.setaddressBook(item.establishmentNo);
    this.navCtrl.navigateForward(['expense-entry']);
  }

  loadData(event: { target: { complete: () => void } }) {
    if (this.exparr != undefined) {
      if (this.exparr.length === 500) {
        setTimeout(() => {
          console.log('Done');
          this.addMoreItems();
          this.numTimesLeft -= 1;
          event.target.complete();
        }, 500);
      } else {
        this.numTimesLeft = 0;
        event.target.complete();
      }
    }else{
      this.expquerysearch();
      this.loading.dismiss();}
  }

  addMoreItems() {
    for (let i = this.inde; i < this.inde + 20; i++) {
      this.expQuery.push(this.exparr[i]);
    }
    this.inde += 20;
  }

  async expquerysearch() {

    let dispMode = '';
    if (this.displayMode === undefined) {
      dispMode = '2';
    } else {
      dispMode = this.sess.getdisplayModeKey();
    }

    let rt = '';
    if (this.repType === undefined) {
      rt = '';
    } else {
      rt = this.sess.geteRepTypeKey();
    }
    this.loading.present('Loading Data...');
    await this.expInqAPI.callexpenseInquiry(dispMode, rt).subscribe(
      (res) => {
        console.log(res);
        this.datauser = res;
        console.log(this.datauser);
        const responSe = JSON.parse(JSON.stringify(this.datauser));
        if (responSe.LFS_FREQ_Expense_Inquiry_1.length > 0) {
          this.expQuery = new Array();
          this.exparr = new Array();
          for (
            let index = 0;
            index < responSe.LFS_FREQ_Expense_Inquiry_1.length;
            index++
          ) {
            const employeeName: string = JSON.stringify(
              responSe.LFS_FREQ_Expense_Inquiry_1[index].Employee_Name
            ).replace(/\"/g, '');

            const typeDescription: string = JSON.stringify(
              responSe.LFS_FREQ_Expense_Inquiry_1[index].Type_Description
            ).replace(/\"/g, '');

            const reportNumber: string = JSON.stringify(
              responSe.LFS_FREQ_Expense_Inquiry_1[index].Report_Number
            ).replace(/\"/g, '');

            const reportDate: string = JSON.stringify(
              responSe.LFS_FREQ_Expense_Inquiry_1[index].Report_Date
            ).replace(/\"/g, '');

            const expTotal: string = JSON.stringify(
              responSe.LFS_FREQ_Expense_Inquiry_1[index].Total_Expenses
            ).replace(/\"/g, '');

            const submitDate: string = JSON.stringify(
              responSe.LFS_FREQ_Expense_Inquiry_1[index].Report_Status
            ).replace(/\"/g, '');

            const eRepDesc: string = JSON.stringify(
              responSe.LFS_FREQ_Expense_Inquiry_1[index].Report_Description
            ).replace(/\"/g, '');

            this.exparr.push({
              employeeName: employeeName,
              eReportType: typeDescription,
              eReportNumber: reportNumber,
              eReportDate: reportDate,
              totalExpense: expTotal,
              reportStatus: submitDate,
              eReportDescription: eRepDesc,
            });
          }
          this.loading.dismiss();
          if (this.exparr != undefined) {
            if (this.exparr.length === 500) {
              this.inde = 0;
              for (let index = this.inde; index < 20; index++) {
                this.expQuery.push(this.exparr[index]);
                this.inde++;
              }
            } else {
              this.expQuery = this.exparr;
            }
          } else {
            this.loading.dismiss();
          }
        } else {
          this.loading.dismiss();
          this.expQuery = [];
        }
      },
      (err) => {
        this.loading.dismiss();
        this.presentAlert('Invalid Session please login again');
        this.router.navigate(['./login']);
        return;
      }
    );
  }

  async presentAlert(errorMsg: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Error in Processing',
      message: errorMsg,
      buttons: ['OK'],
    });
    alert.present();
  }

  async udcSearch(proCode: string, sysCode: string) {
    this.loading.present('Loading Data...');
    const qbeValue = '*';
    await this.udcListSrvc.getUDC(proCode, sysCode, qbeValue).subscribe(
      (res) => {
        console.log(res);
        this.datauser = res;
        // console.log(this.datauser);
        const responSe = JSON.parse(JSON.stringify(this.datauser));
        if (responSe.fs_P0004A_W0004AA.data.gridData.summary.records > 0) {
          this.displayString = new Array(
            responSe.fs_P0004A_W0004AA.data.gridData.rowset.length
          );

          this.udc = new Array();
          // tslint:disable-next-line: prefer-for-of
          for (
            let index = 0;
            index < responSe.fs_P0004A_W0004AA.data.gridData.rowset.length;
            index++
          ) {
            const udcVal: string = JSON.stringify(
              responSe.fs_P0004A_W0004AA.data.gridData.rowset[
                index
              ].z_KY_10.valueOf()
            );
            const obj1 = JSON.parse(udcVal);
            this.udcValue = obj1.internalValue;

            const udcName: string = JSON.stringify(
              responSe.fs_P0004A_W0004AA.data.gridData.rowset[
                index
              ].z_DL01_11.valueOf()
            );
            const obj2 = JSON.parse(udcName);
            this.udcDescr = obj2.internalValue;
            this.udc.push({ udcKey: this.udcValue, udcValue: this.udcDescr });
            // console.log(this.addressNo1 + this.name1);
          }
        }
        this.openUDCDetails(this.udc, proCode, sysCode);
        this.loading.dismiss();
      },
      (err) => {
        this.loading.dismiss();
        this.presentAlert('Invalid Session please login again');
        this.router.navigate(['./login']);
        return;
      }
    );
  }

  async openUDCDetails(parameter: any, proCod: string, sysCod: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        proCode: proCod,
        sysCode: sysCod,
      },
    };
    await this.storage.set('myParam', parameter);
    await this.navCtrl.navigateForward(['./udc-search'], navigationExtras);
  }
}

interface Expensequery {
  employeeName: string;
  eReportType: string;
  eReportNumber: string;
  eReportDate: string;
  totalExpense: string;
  reportStatus: string;
  eReportDescription: string;
}

interface UDC {
  udcKey: string;
  udcValue: string;
}