import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SiginPageRoutingModule } from './sigin-routing.module';

import { SiginPage } from './sigin.page';
import { NetworkService } from '../services/network.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SiginPageRoutingModule
  ],
  declarations: [SiginPage],
  providers: [NetworkService],
})
export class SiginPageModule {}
