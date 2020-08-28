import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CelosCompletePage } from './celos-complete.page';

const routes: Routes = [
  {
    path: '',
    component: CelosCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CelosCompletePageRoutingModule {}
