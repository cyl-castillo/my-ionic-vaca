import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AretePageRoutingModule } from './arete-routing.module';

import { AretePage } from './arete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AretePageRoutingModule
  ],
  declarations: [AretePage]
})
export class AretePageModule {}
