import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusignesPageRoutingModule } from './busignes-routing.module';

import { BusignesPage } from './busignes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusignesPageRoutingModule
  ],
  declarations: [BusignesPage]
})
export class BusignesPageModule {}
