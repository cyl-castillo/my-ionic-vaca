import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeHealthPageRoutingModule } from './home-health-routing.module';

import { HomeHealthPage } from './home-health.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeHealthPageRoutingModule
  ],
  declarations: [HomeHealthPage]
})
export class HomeHealthPageModule {}
