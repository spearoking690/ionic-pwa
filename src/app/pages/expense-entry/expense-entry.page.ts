import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GetUdclistService } from 'src/app/services/get-udclist.service';
import { AppcallService } from 'src/app/services/appcall.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { SessionService } from 'src/app/services/session.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.page.html',
  styleUrls: ['./expense-entry.page.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class ExpenseEntryPage  {
  constructor(
    public alertController: AlertController,
    private appcall: AppcallService,
    private loading: LoadingServiceService,
    private udcListSrvc: GetUdclistService,
    public sess: SessionService,
    private router: Router,
    public navCtrl: NavController,
    public storage: Storage,
    public photos: PhotoService
  ) {    }

  indexof: number;
  reportDescription: string;
  reportType: string;
  date: string;
  businesspurpose: string;
  manager: any;
  private udcValue: string;
  private displayString: string[];
  private datauser: any;
  private udcDescr: string;
  private udc: UDC[];
  receipts: ExpPhoto[] = [];
  expenseList: Expenseinfo[] = [];

  expenseCategory: string;
  expenseDate: string;
  chargeType: string;
  businessUnit: string;
  expenseLocation: string;
  paymentMethod: string;
  rate: string;
  expenseAmount: string;
  expensecurrency: string;
  quantity: string;
  exchRate: string;
  reimburseCurrency: string;
  reimburseAmount: string;
  receiptLabel: string;

  @ViewChild('popover') popover;
  /*--------------------------------------------------------------------------*/
  ionViewWillEnter() {
    this.reportType = this.sess.getreportType();
    this.manager = this.sess.getaddressBook();
    this.expenseList = this.sess.getExpenseList();
  }
  scrollTo(e) {
    console.log(e);
    e.srcElement.scrollIntoView({ behaviour: 'smooth', block: 'start' });
  }

  back() {
    this.navCtrl.navigateBack(['expense-inquiry']);
  }
  /*--------------------------------------------------------------------------*/
  public getBusinesspurpose(): string {
    return this.businesspurpose;
  }

  public setBusinesspurpose(businesspurpose: string): void {
    this.businesspurpose = businesspurpose;
  }

  public getReportDescription(): string {
    return this.reportDescription;
  }

  public setReportDescription(reportDescription: string): void {
    this.reportDescription = reportDescription;
  }

  public getReportType(): string {
    return this.reportType;
  }

  public setReportType(reportType: string): void {
    this.reportType = reportType;
  }

  public getUdcValue(): string {
    return this.udcValue;
  }

  public setUdcValue(udcValue: string): void {
    this.udcValue = udcValue;
  }
  public getDate(): string {
    return this.date;
  }

  public setDate(date: string): void {
    this.date = date;
  }

  public getManager(): any {
    return this.manager;
  }

  public setManager(manager: any): void {
    this.manager = manager;
  }

  async searchManager() {
    await this.router.navigate(['./address-search']);
  }

  async addDetails() {
    this.navCtrl.navigateForward(['expense-details']);
  }


  gotoexp() {
    this.navCtrl.navigateForward(['expense-details']);
  }

  deleteExpense() {}

  showExpense(index: number) {
    this.sess.setExpenseCategory(this.expenseList[index].expenseCategory);
    this.sess.setdate(this.expenseList[index].expenseDate);
    this.sess.setChargeType(this.expenseList[index].chargeType);
    this.sess.setBusinessUnit(this.expenseList[index].businessUnit);
    this.sess.setELocation(this.expenseList[index].expenseLocation);
    this.sess.setPaymethod(this.expenseList[index].paymentMethod);
    this.sess.setRate(this.expenseList[index].rate);
    this.sess.setEAmt(this.expenseList[index].expenseAmount);
    this.sess.seteCurrency(this.expenseList[index].expensecurrency);
    this.sess.setQty(this.expenseList[index].quantity);
    this.indexof = index;
    this.navCtrl.navigateForward(['expense-details']);
  }

  async addExpenseReport() {
    this.sess.setExpenseList(this.expenseList);
  }

  async udcSearch(proCode: string, sysCode: string) {
    this.sess.setreportType(this.reportType);
    this.sess.setdate(this.date);

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

  async presentAlert(errorMsg: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Error in Processing',
      message: errorMsg,
      buttons: ['OK'],
    });
    alert.present();
  }
}

interface UDC {
  udcKey: string;
  udcValue: string;
}

interface Expenseinfo {
  expenseCategory: string;
  expenseDate: string;
  chargeType: string;
  businessUnit: string;
  expenseLocation: string;
  paymentMethod: string;
  rate: string;
  expenseAmount: string;
  expensecurrency: string;
  quantity: string;
}

interface ExpPhoto {
  filepath: string;
  webviewPath: string;
  base64?: string;
  blob:Blob;
}

