import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFilterPageRoutingModule } from './modal-filter-routing.module';

import { ModalFilterPage } from './modal-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFilterPageRoutingModule
  ],
  declarations: []
})
export class ModalFilterPageModule {}
