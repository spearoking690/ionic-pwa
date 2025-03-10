import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuSearchPageRoutingModule } from './bu-search-routing.module';

import { BuSearchPage } from './bu-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuSearchPageRoutingModule
  ],
  declarations: [BuSearchPage]
})
export class BuSearchPageModule {}
