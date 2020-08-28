import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeReproductionPageRoutingModule } from './home-reproduction-routing.module';

import { HomeReproductionPage } from './home-reproduction.page';
import {RouterModule} from '@angular/router';
import {HomePage} from '../../home/home.page';
import {ServicesPage} from '../services/services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeReproductionPage,
        // children: [
        //   {
        //     path: 'services',
        //     component: ServicesPage
        //   }
        // ]
      }
    ])
  ],
  declarations: [HomeReproductionPage]
})
export class HomeReproductionPageModule {}
