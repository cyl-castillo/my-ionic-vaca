import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SQLite } from '@ionic-native/sqlite/ngx';
import {DbcontextService} from './services/dbcontext.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';
import { NetworkService } from './services/network.service';
import { ApiService } from './services/api.service';
import { InterceptorService } from './services/interceptor.service';
import { Network } from '@ionic-native/network/ngx';
import { FormsModule } from '@angular/forms';
import { Insomnia } from '@ionic-native/insomnia/ngx';

// @ts-ignore
// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    IonicModule.forRoot({ _forceStatusbarPadding: true, scrollPadding: true,
      scrollAssist: true}),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PipesModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    NetworkService,
    ApiService,
    Insomnia,
    SQLite,
      DbcontextService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
