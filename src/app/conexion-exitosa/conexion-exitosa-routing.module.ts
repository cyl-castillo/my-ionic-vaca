import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConexionExitosaPage } from './conexion-exitosa.page';

const routes: Routes = [
  {
    path: '',
    component: ConexionExitosaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConexionExitosaPageRoutingModule {}
