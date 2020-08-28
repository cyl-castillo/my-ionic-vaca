import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryHomeHmPageRoutingModule } from './inventory-home-hm-routing.module';

import { InventoryHomeHmPage } from './inventory-home-hm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryHomeHmPageRoutingModule
  ],
  declarations: [InventoryHomeHmPage]
})
export class InventoryHomeHmPageModule {}
