import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PalpacionCompletePage } from './palpacion-complete.page';

const routes: Routes = [
  {
    path: '',
    component: PalpacionCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PalpacionCompletePageRoutingModule {}
