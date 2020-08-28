import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CelosCompletePageRoutingModule } from './celos-complete-routing.module';

import { CelosCompletePage } from './celos-complete.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CelosCompletePageRoutingModule,
    Ionic4DatepickerModule,
  ],
  declarations: [CelosCompletePage]
})
export class CelosCompletePageModule {}
