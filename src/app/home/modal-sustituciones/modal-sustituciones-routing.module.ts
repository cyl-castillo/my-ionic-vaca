import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalSustitucionesPage } from './modal-sustituciones.page';

const routes: Routes = [
  {
    path: '',
    component: ModalSustitucionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalSustitucionesPageRoutingModule {}
