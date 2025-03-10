import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UdcSearchPage } from './udc-search.page';

const routes: Routes = [
  {
    path: '',
    component: UdcSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UdcSearchPageRoutingModule {}
