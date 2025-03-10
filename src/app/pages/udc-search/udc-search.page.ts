import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { GetUdclistService } from 'src/app/services/get-udclist.service';
import { NavController, AlertController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';


@Component({
  selector: 'app-udc-search',
  templateUrl: './udc-search.page.html',
  styleUrls: ['./udc-search.page.scss'],
})
export class UdcSearchPage implements OnInit {
  udc: UDC[];
  udcDesc: string;
  datauser: any;
  udcValue: string;
  udcDescr: string;
  proCod: string;
  sysCod: string;

  constructor(
    private storage: Storage,
    private router: Router,
    private loading: LoadingServiceService,
    private udcAPI: GetUdclistService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private actRoute: ActivatedRoute,
    public sess: SessionService,
    private location: Location
  ) {
    storage.get('myParam').then((parameter) => {
      console.log('Received Parameter: ' + parameter);
      this.udc = parameter;
    });
  }

  ngOnInit() {
    console.log('Received Parameter: ' + this.udc);
  }

  getlocation(item: UDC) {
    this.actRoute.queryParams.subscribe((params) => {
      this.proCod = params['proCode'];
      this.sysCod = params['sysCode'];
    });
    if (this.sysCod === 'RT') {
      this.sess.setreportType(item.udcValue);
      this.sess.seteRepTypeKey(item.udcKey);
    } else if (this.sysCod === 'RD') {
      this.sess.setdisplayMode(item.udcValue);
      this.sess.setdisplayModeKey(item.udcKey);
    } else if (this.sysCod === 'EC') {
      this.sess.setExpenseCategory(item.udcValue);
      this.sess.setEcKey(item.udcKey);
    } else if (this.sysCod === 'CT') {
      this.sess.setChargeType(item.udcValue);
      this.sess.setCtKey(item.udcKey);
    } else if (this.sysCod === 'EL') {
      this.sess.setELocation(item.udcValue);
      this.sess.setElKey(item.udcKey);
    } else if (this.sysCod === 'PM') {
      this.sess.setPaymethod(item.udcValue);
      this.sess.setPmKey(item.udcKey);
    }

    this.location.back();
  }

  back(){  
    this.location.back();
  }

  async search() {
    this.loading.present('Loading Data...');
    this.actRoute.queryParams.subscribe((params) => {
      this.proCod = params['proCode'];
      this.sysCod = params['sysCode'];
    });
    await this.udcAPI.getUDC(this.proCod, this.sysCod, this.udcDesc).subscribe(
      (res) => {
        console.log(res);
        this.datauser = res;
        // console.log(this.datauser);
        const responSe = JSON.parse(JSON.stringify(this.datauser));
        if (responSe.fs_P0004A_W0004AA.data.gridData.summary.records > 0) {
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
