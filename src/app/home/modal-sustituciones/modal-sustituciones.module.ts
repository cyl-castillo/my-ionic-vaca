import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalSustitucionesPageRoutingModule } from './modal-sustituciones-routing.module';

import { ModalSustitucionesPage } from './modal-sustituciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalSustitucionesPageRoutingModule
  ],
  declarations: [ModalSustitucionesPage]
})
export class ModalSustitucionesPageModule {}
