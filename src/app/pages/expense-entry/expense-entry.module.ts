import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseEntryPageRoutingModule } from './expense-entry-routing.module';

import { ExpenseEntryPage } from './expense-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseEntryPageRoutingModule
  ],
  declarations: [ExpenseEntryPage]
})
export class ExpenseEntryPageModule {}
