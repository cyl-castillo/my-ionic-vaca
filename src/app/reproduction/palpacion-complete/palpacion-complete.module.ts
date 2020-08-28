import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PalpacionCompletePageRoutingModule } from './palpacion-complete-routing.module';

import { PalpacionCompletePage } from './palpacion-complete.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PalpacionCompletePageRoutingModule,
    Ionic4DatepickerModule,
  ],
  declarations: [PalpacionCompletePage]
})
export class PalpacionCompletePageModule {}
