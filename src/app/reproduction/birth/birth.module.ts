import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BirthPageRoutingModule } from './birth-routing.module';

import { BirthPage } from './birth.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
// import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BirthPageRoutingModule,
    Ionic4DatepickerModule,
  ],
  declarations: [BirthPage]
})
export class BirthPageModule {}
