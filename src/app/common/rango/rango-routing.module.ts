import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RangoPage } from './rango.page';

const routes: Routes = [
  {
    path: '',
    component: RangoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RangoPageRoutingModule {}
