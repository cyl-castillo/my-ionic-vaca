import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LechePage } from './leche.page';

const routes: Routes = [
  {
    path: '',
    component: LechePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LechePageRoutingModule {}
