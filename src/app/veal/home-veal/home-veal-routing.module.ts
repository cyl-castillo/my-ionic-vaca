import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeVealPage } from './home-veal.page';

const routes: Routes = [
  {
    path: '',
    component: HomeVealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeVealPageRoutingModule {}
