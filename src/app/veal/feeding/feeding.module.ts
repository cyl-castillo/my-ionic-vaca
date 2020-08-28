import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedingPageRoutingModule } from './feeding-routing.module';

import { FeedingPage } from './feeding.page';
import {Ionic4DatepickerModule} from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    FeedingPageRoutingModule
  ],
  declarations: [FeedingPage]
})
export class FeedingPageModule {}
