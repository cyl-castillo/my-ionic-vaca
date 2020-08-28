import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SustitucionesPage } from './sustituciones.page';

const routes: Routes = [
  {
    path: '',
    component: SustitucionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SustitucionesPageRoutingModule {}
