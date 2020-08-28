import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryHomeHmPage } from './inventory-home-hm.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryHomeHmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryHomeHmPageRoutingModule {}
