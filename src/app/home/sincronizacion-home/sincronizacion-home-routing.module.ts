import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SincronizacionHomePage } from './sincronizacion-home.page';

const routes: Routes = [
  {
    path: '',
    component: SincronizacionHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SincronizacionHomePageRoutingModule {}
