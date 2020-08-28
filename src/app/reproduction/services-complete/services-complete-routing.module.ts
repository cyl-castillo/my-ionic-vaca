import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesCompletePage } from './services-complete.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesCompletePageRoutingModule {}
