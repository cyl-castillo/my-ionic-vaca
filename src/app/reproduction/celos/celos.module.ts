import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CelosPageRoutingModule } from './celos-routing.module';

import { CelosPage } from './celos.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CelosPageRoutingModule,
    Ionic4DatepickerModule,
  ],
  declarations: [CelosPage]
})
export class CelosPageModule {}
