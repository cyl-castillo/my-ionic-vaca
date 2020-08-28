import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PalpacionPage } from './palpacion.page';

const routes: Routes = [
  {
    path: '',
    component: PalpacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PalpacionPageRoutingModule {}
