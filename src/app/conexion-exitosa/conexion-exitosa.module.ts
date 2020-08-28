import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConexionExitosaPageRoutingModule } from './conexion-exitosa-routing.module';

import { ConexionExitosaPage } from './conexion-exitosa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConexionExitosaPageRoutingModule
  ],
  declarations: [ConexionExitosaPage]
})
export class ConexionExitosaPageModule {}
