import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BirthCompletePageRoutingModule } from './birth-complete-routing.module';

import { BirthCompletePage } from './birth-complete.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BirthCompletePageRoutingModule,
    Ionic4DatepickerModule,
  ],
  declarations: [BirthCompletePage]
})
export class BirthCompletePageModule {}
