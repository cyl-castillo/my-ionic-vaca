import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimalHistoricalPageRoutingModule } from './animal-historical-routing.module';

import { AnimalHistoricalPage } from './animal-historical.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimalHistoricalPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [AnimalHistoricalPage]
})
export class AnimalHistoricalPageModule {}
