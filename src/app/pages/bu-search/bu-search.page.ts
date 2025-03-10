import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NavController,AlertController,IonInfiniteScroll} from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { ViewChild } from '@angular/core';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { GetBUListService } from 'src/app/services/get-bulist.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bu-search',
  templateUrl: './bu-search.page.html',
  styleUrls: ['./bu-search.page.scss'],
})
export class BuSearchPage implements OnInit {
  businessUnit: BUList[];
  qbeValue: string;
  datauser: any;
  addressNo1: any;
  name1: any;
  searchType: string;
  retAddNo: string;
  retDesc: string;
  inde = 0;
  buarr: BUList[];
  numTimesLeft = 25;

  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;

  constructor(
    private router: Router,
    private loading: LoadingServiceService,
    private buListAPI: GetBUListService,
    private navCtrl: NavController,
    public sess: SessionService,
    private alertController: AlertController,
    private location: Location
  ) {}

  ngOnInit() {}

  back() {
    this.location.back();
  }

  ionViewWillEnter() {
    this.search();
  }

  getbusinessUnit(item: any) {
    this.sess.setBusinessUnit(item.busUnit);
    this.navCtrl.navigateBack(['expense-details']);
  }

  loadData(event) {
    if (this.buarr.length === 500) {
      setTimeout(() => {
        console.log('Done');
        this.addMoreItems();
        this.numTimesLeft -= 1;
        event.target.complete();
      }, 500);
    } else {
      event.target.complete();
    }
  }

  addMoreItems() {
    for (let i = this.inde; i < this.inde + 20; i++) {
      this.businessUnit.push(this.buarr[i]);
    }
    this.inde += 20;
  }

  async search() {
    this.loading.present('Loading Data...');
    let qbe = '';
    if (this.qbeValue === undefined) {
      qbe = '*';
    } else {
      qbe = `*${this.qbeValue}*`;
    }

    await this.buListAPI.searchBU(qbe).subscribe(
      (res) => {
        console.log(res);
        this.datauser = res;
        console.log(this.datauser);
        const responSe = JSON.parse(JSON.stringify(this.datauser));
        if (responSe.fs_P0006S_W0006SA.data.gridData.summary.records > 0) {
          this.businessUnit = new Array();
          this.buarr = new Array();
          for (
            let index = 0;
            index < responSe.fs_P0006S_W0006SA.data.gridData.rowset.length;
            index++
          ) {
            const mcu: string = JSON.stringify(
              responSe.fs_P0006S_W0006SA.data.gridData.rowset[
                index
              ].z_MCU_5.valueOf()
            );
            const obj1 = JSON.parse(mcu);
            const mCU = obj1.internalValue;

            const buName: string = JSON.stringify(
              responSe.fs_P0006S_W0006SA.data.gridData.rowset[
                index
              ].z_DL01_38.valueOf()
            );
            const obj2 = JSON.parse(buName);
            const name = obj2.internalValue;
            this.buarr.push({
              busUnit: mCU,
              desc: name,
            });
          }
          this.loading.dismiss();
          if (this.buarr.length === 500) {
            this.inde = 0;
            for (let index = this.inde; index < 20; index++) {
              this.businessUnit.push(this.buarr[index]);
              this.inde++;
            }
          } else {
            this.businessUnit = this.buarr;
          }
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
}

interface BUList {
  busUnit: string;
  desc: string;
}
