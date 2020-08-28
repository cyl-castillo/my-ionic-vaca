import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeReproductionPage } from './home-reproduction.page';
import {path} from '@angular-devkit/core';
import {ServicesPage} from '../services/services.page';

const routes: Routes = [
  {
    path: '',
    component: HomeReproductionPage,
    // children: [
    //   {
    //     path: 'services',
    //     component: ServicesPage,
    //     pathMatch: 'full'
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // declarations:[ServicesPage]
})
export class HomeReproductionPageRoutingModule {}
