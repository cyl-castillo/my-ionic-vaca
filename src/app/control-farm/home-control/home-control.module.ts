import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeControlPageRoutingModule } from './home-control-routing.module';

import { HomeControlPage } from './home-control.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeControlPageRoutingModule
  ],
  declarations: [HomeControlPage]
})
export class HomeControlPageModule {}
