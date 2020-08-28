import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController, ModalController } from '@ionic/angular';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { Router } from '@angular/router';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { Tables } from 'src/app/models/enums';
import * as moment from 'moment';

@Component({
  selector: 'app-sustituciones',
  templateUrl: './sustituciones.page.html',
  styleUrls: ['./sustituciones.page.scss'],
})
export class SustitucionesPage implements OnInit {

  arrayEvent:any[] = []
  arrayEventToday:any[] = []
  arrayEventTomorrow:any[] = []
  arrayEventTomorrowMore:any[] = []
  fecha: string;

  constructor(private modalController: ModalController, private insomnia: Insomnia,public navCtrl: NavController,private router: Router,private alertCtrl: AlertController,private dbContext: DbcontextService,public loadingCtrl: LoadingController,) { }


  ngOnInit() {
  }


  async load(){
    this.presentLoading();
    if(this.arrayEvent.length == 0){
      this.arrayEvent = await this.dbContext.getDataFromTable(Tables.Bitacora)
    } 
    if(this.arrayEvent.length !== 0){ 
      this.arrayEvent.forEach(element=>{
         
          if(moment().format('DD-MM-YYYY') == element.fecha_generacion){
            element.completar = 'checkmark'
            this.arrayEventToday.push(element)
            console.log(this.arrayEventToday)
            
          }
          if(moment().subtract(1,'day').format('DD-MM-YYYY') == element.fecha_generacion){
            this.arrayEventTomorrow.push(element)
            console.log(this.arrayEventTomorrow)
          }
          if(moment().format('DD-MM-YYYY') < element.fecha_generacion){
            this.arrayEventTomorrowMore.push(element)
            console.log(this.arrayEventTomorrowMore)
          }        
      })
      console.log(this.arrayEvent)
    }
  }

  fechaFormat(fecha){
    return this.fecha = moment(fecha, 'DD-MM-YYYY').format('DD-MMM');
  }

  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
    this.load()
  }

  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      //message: 'Loading...',
      spinner: 'bubbles',
      duration: 2000
    });
    return await loading.present();
  }

}
