import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseInquiryPageRoutingModule } from './expense-inquiry-routing.module';

import { ExpenseInquiryPage } from './expense-inquiry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseInquiryPageRoutingModule
  ],
  declarations: [ExpenseInquiryPage]
})
export class ExpenseInquiryPageModule {}
