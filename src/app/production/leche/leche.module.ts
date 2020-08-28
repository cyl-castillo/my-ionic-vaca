import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LechePageRoutingModule } from './leche-routing.module';

import { LechePage } from './leche.page';
import {Ionic4DatepickerModule} from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    LechePageRoutingModule
  ],
  declarations: [LechePage]
})
export class LechePageModule {}
