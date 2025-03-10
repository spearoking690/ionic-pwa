import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseEntryPage } from './expense-entry.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseEntryPageRoutingModule {}
