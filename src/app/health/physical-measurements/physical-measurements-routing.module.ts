import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysicalMeasurementsPage } from './physical-measurements.page';

const routes: Routes = [
  {
    path: '',
    component: PhysicalMeasurementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicalMeasurementsPageRoutingModule {}
