import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesCompletePageRoutingModule } from './services-complete-routing.module';

import { ServicesCompletePage } from './services-complete.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesCompletePageRoutingModule,
    Ionic4DatepickerModule,
  ],
  declarations: [ServicesCompletePage]
})
export class ServicesCompletePageModule {}
