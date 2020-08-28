import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SustitucionesPageRoutingModule } from './sustituciones-routing.module';

import { SustitucionesPage } from './sustituciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SustitucionesPageRoutingModule
  ],
  declarations: [SustitucionesPage]
})
export class SustitucionesPageModule {}
