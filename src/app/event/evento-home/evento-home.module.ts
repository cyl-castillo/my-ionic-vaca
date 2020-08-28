import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventoHomePageRoutingModule } from './evento-home-routing.module';

import { EventoHomePage } from './evento-home.page';
import { ModalFilterPage } from '../modal-filter/modal-filter.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventoHomePageRoutingModule,
    PipesModule,
  ],
  declarations: [EventoHomePage,ModalFilterPage],
  entryComponents: [ModalFilterPage]
})
export class EventoHomePageModule {}
