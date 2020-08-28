import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SicknessPage } from './sickness.page';

const routes: Routes = [
  {
    path: '',
    component: SicknessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SicknessPageRoutingModule {}
