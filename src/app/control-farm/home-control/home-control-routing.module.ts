import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeControlPage } from './home-control.page';

const routes: Routes = [
  {
    path: '',
    component: HomeControlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeControlPageRoutingModule {}
