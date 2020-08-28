import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEventPage } from './modal-event.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEventPageRoutingModule {}
