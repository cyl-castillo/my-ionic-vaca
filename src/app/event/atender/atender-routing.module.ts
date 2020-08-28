import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtenderPage } from './atender.page';

const routes: Routes = [
  {
    path: '',
    component: AtenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtenderPageRoutingModule {}
