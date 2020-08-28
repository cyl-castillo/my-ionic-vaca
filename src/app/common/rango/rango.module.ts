import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RangoPageRoutingModule } from './rango-routing.module';

import { RangoPage } from './rango.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RangoPageRoutingModule
  ],
  declarations: [RangoPage]
})
export class RangoPageModule {}
