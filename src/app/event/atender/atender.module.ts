import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtenderPageRoutingModule } from './atender-routing.module';

import { AtenderPage } from './atender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtenderPageRoutingModule
  ],
  declarations: [AtenderPage]
})
export class AtenderPageModule {}
