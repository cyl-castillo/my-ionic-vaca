import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimalHistoricalPage } from './animal-historical.page';

const routes: Routes = [
  {
    path: '',
    component: AnimalHistoricalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalHistoricalPageRoutingModule {}
