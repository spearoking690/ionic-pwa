import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingServiceService {
  isLoading = false;

  constructor(public loadingController: LoadingController) {}

  async present(messages: string) {
    this.isLoading = true;
    return await this.loadingController
      .create({
        message: messages,
        cssClass: 'custom-loader-class',
        spinner: 'dots',
      })
      .then((a) => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController
      .dismiss()
      .then(() => console.log('dismissed'));
  }
}
