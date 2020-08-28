import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PalpacionPageRoutingModule } from './palpacion-routing.module';

import { PalpacionPage } from './palpacion.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PalpacionPageRoutingModule,
    Ionic4DatepickerModule,
  ],
  declarations: [PalpacionPage]
})
export class PalpacionPageModule {}
