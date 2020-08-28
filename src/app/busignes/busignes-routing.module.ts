import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusignesPage } from './busignes.page';

const routes: Routes = [
  {
    path: '',
    component: BusignesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusignesPageRoutingModule {}
