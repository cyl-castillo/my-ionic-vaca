import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConexionPageRoutingModule } from './conexion-routing.module';

import { ConexionPage } from './conexion.page';
import { NetworkService } from '../services/network.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConexionPageRoutingModule
  ],
  declarations: [ConexionPage],
  providers: [NetworkService],
})
export class ConexionPageModule {}
