import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeathsPageRoutingModule } from './deaths-routing.module';

import { DeathsPage } from './deaths.page';
import {Ionic4DatepickerModule} from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    DeathsPageRoutingModule
  ],
  declarations: [DeathsPage]
})
export class DeathsPageModule {}
