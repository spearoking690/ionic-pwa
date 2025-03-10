import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GetUdclistService } from 'src/app/services/get-udclist.service';
import { GetBUListService } from 'src/app/services/get-bulist.service';
import { AppcallService } from 'src/app/services/appcall.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { PhotoService } from 'src/app/services/photo.service';
import { SessionService } from 'src/app/services/session.service';
import { ExpenseEntryPage } from '../expense-entry/expense-entry.page';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.page.html',
  styleUrls: ['./expense-details.page.scss'],
})
export class ExpenseDetailsPage implements OnInit {
  @ViewChild('popover') popover;

  private udcDescr: string;
  private udc: UDC[];
  private udcValue: string;
  private datauser: any;

  isOpen = false;

  constructor(
    private udcListSrvc: GetUdclistService,
    private buListSrvc: GetBUListService,
    private uploadRec: AppcallService,
    public alertController: AlertController,
    private loading: LoadingServiceService,
    public sess: SessionService,
    public expEntry: ExpenseEntryPage,
    private router: Router,
    public navCtrl: NavController,
    public storage: Storage,
    public photoService: PhotoService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.expEntry.expenseCategory = this.sess.getExpenseCategory();
    this.expEntry.chargeType = this.sess.getChargeType();
    this.expEntry.businessUnit = this.sess.getBusinessUnit();
    this.expEntry.expenseLocation = this.sess.getELocation();
    this.expEntry.paymentMethod = this.sess.getPaymethod();
    this.expEntry.rate = this.sess.getRate();
    this.expEntry.quantity = this.sess.getQty();
    this.expEntry.expenseAmount = this.sess.getEAmt();
    this.expEntry.expensecurrency = this.sess.geteCurrency();
    this.expEntry.expenseDate = this.sess.getdate();
  }
  /*Photo--------------------------------------------------------------------------*/
  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  async takePhoto() {
    this.popoverController.dismiss();
    this.navCtrl.navigateForward(['photo']);
  }
  /*Add more expenses--------------------------------------------------------------------------*/
  async addMore() {}
  /*Go back--------------------------------------------------------------------------*/
  back() {
    this.expEntry.expenseCategory = '';
    this.expEntry.chargeType = '';
    this.expEntry.businessUnit = '';
    this.expEntry.expenseLocation = '';
    this.expEntry.paymentMethod = '';
    this.expEntry.rate = '';
    this.expEntry.quantity = '';
    this.expEntry.expenseAmount = '';
    this.expEntry.expensecurrency = '';
    this.expEntry.expenseDate = '';
    this.navCtrl.navigateBack(['expense-entry']);
  }
  /*UDC Search--------------------------------------------------------------------------*/
  async udcSearch(proCode: string, sysCode: string) {
    this.loading.present('Loading Data...');
    const qbeValue = '*';
    await this.udcListSrvc.getUDC(proCode, sysCode, qbeValue).subscribe(
      (res) => {
        console.log(res);
        this.datauser = res;
        const responSe = JSON.parse(JSON.stringify(this.datauser));
        if (responSe.fs_P0004A_W0004AA.data.gridData.summary.records > 0) {
          this.udc = new Array();
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
  /*BU Search--------------------------------------------------------------------------*/
  async buSearch() {
    this.loading.present('Loading Data...');
    const qbeValue = '*';
    await this.buListSrvc.searchBU(qbeValue).subscribe(
      (res) => {
        console.log(res);
        this.datauser = res;
        const responSe = JSON.parse(JSON.stringify(this.datauser));
        if (responSe.fs_P0006S_W0006SA.data.gridData.summary.records > 0) {
          this.udc = new Array();
          for (
            let index = 0;
            index < responSe.fs_P0006S_W0006SA.data.gridData.rowset.length;
            index++
          ) {
            const udcVal: string = JSON.stringify(
              responSe.fs_P0006S_W0006SA.data.gridData.rowset[
                index
              ].z_MCU_5.valueOf()
            );
            const obj1 = JSON.parse(udcVal);
            this.udcValue = obj1.internalValue;

            const udcName: string = JSON.stringify(
              responSe.fs_P0006S_W0006SA.data.gridData.rowset[
                index
              ].z_DL01_38.valueOf()
            );
            const obj2 = JSON.parse(udcName);
            this.udcDescr = obj2.internalValue;
            this.udc.push({ udcKey: this.udcValue, udcValue: this.udcDescr });
          }
        }
        this.openbuDetails();
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

  async openbuDetails(){
  await this.navCtrl.navigateForward(['./bu-search']);
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
      subHeader: '',
      message: errorMsg,
      buttons: ['OK'],
    });
    alert.present();
  }

  //Media Insert-----------------------------------------------------------------------
  async uploadReceipt(postion: any) {
    let file = this.photoService.photoslist[postion].blob;

    this.loading.present('Loading Data...');
    await this.uploadRec.uploadPhoto(file).subscribe(
      (res) => {
        console.log(res);
        this.datauser = res;
        const responSe = JSON.parse(JSON.stringify(this.datauser));
        if (responSe.itemName) {
          this.loading.dismiss();
          this.presentAlert('Uploaded Successfully!');
        } else if (responSe.error) {
          this.loading.dismiss();
          this.presentAlert(responSe.error);
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
  //-----------------------------------------------------------------------------------
  addExpensetoList() {
    if (this.expEntry.expenseList.length === 0) {
      this.expEntry.indexof = 0;
    }
    if (this.expEntry.expenseCategory != null) {
      if (this.expEntry.indexof >= 0) {
        this.expEntry.expenseList.push({
          expenseCategory: this.expEntry.expenseCategory,
          expenseDate: this.expEntry.expenseDate,
          chargeType: this.expEntry.chargeType,
          businessUnit: this.expEntry.businessUnit,
          expenseLocation: this.expEntry.expenseLocation,
          paymentMethod: this.expEntry.paymentMethod,
          rate: this.expEntry.rate,
          expenseAmount: this.expEntry.expenseAmount,
          expensecurrency: this.expEntry.expensecurrency,
          quantity: this.expEntry.quantity,
        });
      } else {
        this.expEntry.expenseList.push({
          expenseCategory: this.expEntry.expenseCategory,
          expenseDate: this.expEntry.expenseDate,
          chargeType: this.expEntry.chargeType,
          businessUnit: this.expEntry.businessUnit,
          expenseLocation: this.expEntry.expenseLocation,
          paymentMethod: this.expEntry.paymentMethod,
          rate: this.expEntry.rate,
          expenseAmount: this.expEntry.expenseAmount,
          expensecurrency: this.expEntry.expensecurrency,
          quantity: this.expEntry.quantity,
        });
      }
      this.expEntry.indexof = this.expEntry.expenseList.length - 1;
      this.sess.setExpenseList(this.expEntry.expenseList);
    }
  }
  goBack() {
    this.navCtrl.navigateBack(['expense-entry']);
  }
}

interface UDC {
  udcKey: string;
  udcValue: string;
}
