import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SicknessCompletePage } from './sickness-complete.page';

const routes: Routes = [
  {
    path: '',
    component: SicknessCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SicknessCompletePageRoutingModule {}
