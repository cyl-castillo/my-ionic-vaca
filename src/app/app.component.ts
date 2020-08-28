import {Component, ElementRef} from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DbcontextService } from './services/dbcontext.service';
import { Router } from '@angular/router';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    // {
    //   title: 'List',
    //   url: '/list',
    //   icon: 'list'
    // },
    {
      title: 'Sincronizar',
      url: '/home/sincronizacion-home',
      icon: 'sync'
    },
    {
      title: 'Empresa',
      url: 'busignes',
      icon: 'logo-octocat'
    },
    /*{
      title: 'Recuperar contraseña',
      url: '',
      icon: 'key'
    },*/
    /*{
      title: 'Dirección',
      url: 'conexion',
      icon: 'contact'
    },*/
    {
      title: 'Salir',
      url: 'sigin',
      icon: 'exit'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private dbContext: DbcontextService,
    public loadingCtrl: LoadingController,
    private router : Router,
    private insomnia: Insomnia,
    private statusBar: StatusBar, private elementRef: ElementRef
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(true);
      this.router.navigateByUrl('sigin');
     // console.log(this.dbContext.testDB())
      /*if(!this.dbContext.testDB()){
        this.presentLoading();
        this.dbContext.initDB();
      }*/
    });
  }

  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Preparando base de datos',
      duration: 20000
    });
    return await loading.present();
  }
}
