import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeProductionPageRoutingModule } from './home-production-routing.module';

import { HomeProductionPage } from './home-production.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //HomeProductionPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeProductionPage,
        // children: [
        //   {
        //     path: 'services',
        //     component: ServicesPage
        //   }
        // ]
      }
    ])
  ],
  declarations: [HomeProductionPage]
})
export class HomeProductionPageModule {}
