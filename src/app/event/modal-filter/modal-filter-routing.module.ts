import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFilterPage } from './modal-filter.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFilterPageRoutingModule {}
