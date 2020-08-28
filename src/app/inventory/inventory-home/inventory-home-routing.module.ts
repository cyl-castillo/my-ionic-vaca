import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryHomePage } from './inventory-home.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryHomePageRoutingModule {}
