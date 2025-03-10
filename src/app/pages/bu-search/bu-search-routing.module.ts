import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuSearchPage } from './bu-search.page';

const routes: Routes = [
  {
    path: '',
    component: BuSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuSearchPageRoutingModule {}
