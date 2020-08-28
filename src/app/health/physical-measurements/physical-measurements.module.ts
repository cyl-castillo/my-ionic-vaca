import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhysicalMeasurementsPageRoutingModule } from './physical-measurements-routing.module';

import { PhysicalMeasurementsPage } from './physical-measurements.page';
import {Ionic4DatepickerModule} from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    PhysicalMeasurementsPageRoutingModule
  ],
  declarations: [PhysicalMeasurementsPage]
})
export class PhysicalMeasurementsPageModule {}
