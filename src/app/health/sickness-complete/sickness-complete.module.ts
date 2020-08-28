import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {SicknessCompletePageRoutingModule} from './sickness-complete-routing.module';

import { SicknessCompletePage } from './sickness-complete.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    SicknessCompletePageRoutingModule
  ],
  declarations: [SicknessCompletePage]
})
export class SicknessCompletePageModule {}
