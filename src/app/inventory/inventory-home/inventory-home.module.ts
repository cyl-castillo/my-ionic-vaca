import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryHomePageRoutingModule } from './inventory-home-routing.module';

import { InventoryHomePage } from './inventory-home.page';
import {ModalFilterPage} from '../modal-filter/modal-filter.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    InventoryHomePageRoutingModule
  ],
  declarations: [InventoryHomePage, ModalFilterPage],
  entryComponents: [ModalFilterPage]
})
export class InventoryHomePageModule {}
