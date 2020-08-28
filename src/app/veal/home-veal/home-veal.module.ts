import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeVealPageRoutingModule } from './home-veal-routing.module';

import { HomeVealPage } from './home-veal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeVealPageRoutingModule
  ],
  declarations: [HomeVealPage]
})
export class HomeVealPageModule {}
