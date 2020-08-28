import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventoHomePage } from './evento-home.page';

const routes: Routes = [
  {
    path: '',
    component: EventoHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventoHomePageRoutingModule {}
