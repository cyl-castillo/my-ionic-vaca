import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeProductionPage } from './home-production.page';

const routes: Routes = [
  {
    path: '',
    component: HomeProductionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeProductionPageRoutingModule {}
