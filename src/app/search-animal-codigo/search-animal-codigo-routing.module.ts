import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchAnimalCodigoPage } from './search-animal-codigo.page';

const routes: Routes = [
  {
    path: '',
    component: SearchAnimalCodigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchAnimalCodigoPageRoutingModule {}
