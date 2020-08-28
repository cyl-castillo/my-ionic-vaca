import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchAnimalCodigoPageRoutingModule } from './search-animal-codigo-routing.module';

import { SearchAnimalCodigoPage } from './search-animal-codigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchAnimalCodigoPageRoutingModule
  ],
  declarations: [SearchAnimalCodigoPage]
})
export class SearchAnimalCodigoPageModule {}
