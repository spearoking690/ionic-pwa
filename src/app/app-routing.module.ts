import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'expense-entry',
    loadChildren: () => import('./pages/expense-entry/expense-entry.module').then( m => m.ExpenseEntryPageModule)
  },
  {
    path: 'udc-search',
    loadChildren: () => import('./pages/udc-search/udc-search.module').then( m => m.UdcSearchPageModule)
  },
  {
    path: 'expense-inquiry',
    loadChildren: () => import('./pages/expense-inquiry/expense-inquiry.module').then( m => m.ExpenseInquiryPageModule)
  },
  {
    path: 'address-search',
    loadChildren: () => import('./pages/address-search/address-search.module').then( m => m.AddressSearchPageModule)
  },
  {
    path: 'expense-details',
    loadChildren: () => import('./pages/expense-details/expense-details.module').then( m => m.ExpenseDetailsPageModule)
  },
  {
    path: 'photo',
    loadChildren: () => import('./pages/photo/photo.module').then( m => m.PhotoPageModule)
  },
  {
    path: 'bu-search',
    loadChildren: () => import('./pages/bu-search/bu-search.module').then( m => m.BuSearchPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
