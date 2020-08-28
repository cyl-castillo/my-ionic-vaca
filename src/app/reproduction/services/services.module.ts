import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesPage } from './services.page';
import {RouterModule} from '@angular/router';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
// import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    RouterModule.forChild([
      {
        path: '',
        component: ServicesPage
      }
    ]),
    ReactiveFormsModule
  ],
  declarations: [ServicesPage]
})
export class ServicesPageModule {}
