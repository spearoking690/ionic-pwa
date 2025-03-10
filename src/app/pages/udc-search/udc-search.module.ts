import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UdcSearchPageRoutingModule } from './udc-search-routing.module';

import { UdcSearchPage } from './udc-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UdcSearchPageRoutingModule
  ],
  declarations: [UdcSearchPage]
})
export class UdcSearchPageModule {}
