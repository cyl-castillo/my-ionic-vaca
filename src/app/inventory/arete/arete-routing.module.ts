import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AretePage } from './arete.page';

const routes: Routes = [
  {
    path: '',
    component: AretePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AretePageRoutingModule {}
