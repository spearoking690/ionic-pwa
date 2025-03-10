import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { SessionService } from 'src/app/services/session.service';
import { TokenService } from 'src/app/services/token.service';
import { SERVER_URL, ENVIRONMENT } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  splash = false;
  userName: string;
  password: string;
  environment: string;
  errorMsg: string;

  constructor(
    public alertController: AlertController,
    private router: Router,
    private loginSrvc: TokenService,
    private sessionSrvc: SessionService,
    private storage:Storage
  ) {
    setTimeout(() => (this.splash = false), 4000);
  }

  ionViewDidLoad() {
    setTimeout(() => (this.splash = false), 300);
  }
  ngOnInit() {
    this.errorMsg = '';
    console.log(SERVER_URL);
    this.storage.create();
  }

  onLogin() {
    //this.router.navigate(['/expense-inquiry']);
    console.log('login');

    this.loginSrvc
      .retrieveToken({
        role: '*ALL',
        deviceName: 'sdk_gphone_x86',
        password: this.password,
        environment: ENVIRONMENT,
        username: this.userName,
      })
      .then(
        (data) => {
          console.log(data);
          if (data.userInfo) {
            console.log(data.userInfo.token); // TODO Store this token
            this.sessionSrvc.setAccessToken(
              data.userInfo.token as unknown as string
            );
            this.sessionSrvc.setuser(
              data.userInfo.alphaName as unknown as string
            );
            this.userName = '';
            this.password = '';
            this.environment = '';
            this.router.navigate(['/expense-inquiry']);
          }
        },
        (error) => {
          console.log(error);
          if (error.error) {
            this.errorMsg = error.message;
            console.log(this.errorMsg);
            this.presentAlert(this.errorMsg);
          } else {
            this.errorMsg = '';
          }
        }
      );
  }

  async presentAlert(errorMsg: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Error in login',
      message: errorMsg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}