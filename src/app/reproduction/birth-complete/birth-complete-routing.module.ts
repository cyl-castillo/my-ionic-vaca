import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BirthCompletePage } from './birth-complete.page';

const routes: Routes = [
  {
    path: '',
    component: BirthCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirthCompletePageRoutingModule {}
