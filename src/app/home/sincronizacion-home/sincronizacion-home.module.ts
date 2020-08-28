import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SincronizacionHomePageRoutingModule } from './sincronizacion-home-routing.module';

import { SincronizacionHomePage } from './sincronizacion-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SincronizacionHomePageRoutingModule
  ],
  declarations: [SincronizacionHomePage]
})
export class SincronizacionHomePageModule {}
