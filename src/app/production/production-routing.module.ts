import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionPage } from './production.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionPage
  },
  /*{
    path: 'home-production',
    loadChildren: () => import('./home-production/home-production.module').then( m => m.HomeProductionPageModule)
  }*/

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionPageRoutingModule {}
