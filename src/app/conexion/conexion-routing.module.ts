import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConexionPage } from './conexion.page';

const routes: Routes = [
  {
    path: '',
    component: ConexionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConexionPageRoutingModule {}
