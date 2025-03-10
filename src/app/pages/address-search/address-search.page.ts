import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  NavController,
  AlertController,
  IonInfiniteScroll,
} from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { ViewChild } from '@angular/core';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { GetaddresslistService } from 'src/app/services/getaddresslist.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.page.html',
  styleUrls: ['./address-search.page.scss'],
})
export class AddressSearchPage implements OnInit {
  addressBook: AddressBook[];
  qbeValue: string;
  datauser: any;
  addressNo1: any;
  name1: any;
  searchType: string;
  retAddNo: string;
  retDesc: string;
  inde = 0;
  addarr: AddressBook[];
  numTimesLeft = 25;

  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;

  constructor(
    private router: Router,
    private loading: LoadingServiceService,
    private addressAPI: GetaddresslistService,
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

  getaddressBook(item: any) {
    this.sess.setaddressBook(item.alphaName);
    this.navCtrl.navigateBack(['expense-entry']);
  }

  loadData(event) {
    if (this.addarr.length === 500) {
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
      this.addressBook.push(this.addarr[i]);
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

    await this.addressAPI.searchAddress('E', qbe).subscribe(
      (res) => {
        console.log(res);
        this.datauser = res;
        console.log(this.datauser);
        const responSe = JSON.parse(JSON.stringify(this.datauser));
        if (responSe.fs_P01012_W01012B.data.gridData.summary.records > 0) {
          this.addressBook = new Array();
          this.addarr = new Array();
          // tslint:disable-next-line: prefer-for-of
          for (
            let index = 0;
            index < responSe.fs_P01012_W01012B.data.gridData.rowset.length;
            index++
          ) {
            const addressnum: string = JSON.stringify(
              responSe.fs_P01012_W01012B.data.gridData.rowset[
                index
              ].z_AN8_19.valueOf()
            );
            const obj1 = JSON.parse(addressnum);
            const addressNum = obj1.internalValue;

            const eName: string = JSON.stringify(
              responSe.fs_P01012_W01012B.data.gridData.rowset[
                index
              ].z_ALPH_20.valueOf()
            );
            const obj2 = JSON.parse(eName);
            const name = obj2.internalValue;
            this.addarr.push({
              addressNo: addressNum,
              alphaName: name,
            });
          }
          this.loading.dismiss();
          if (this.addarr.length === 500) {
            this.inde = 0;
            for (let index = this.inde; index < 20; index++) {
              this.addressBook.push(this.addarr[index]);
              this.inde++;
            }
          } else {
            this.addressBook = this.addarr;
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

interface AddressBook {
  addressNo: string;
  alphaName: string;
}