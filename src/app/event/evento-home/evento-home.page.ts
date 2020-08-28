import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { Tables } from 'src/app/models/enums';
import { ModalFilterPage } from '../modal-filter/modal-filter.page';
import { AtenderPage } from '../atender/atender.page';
import * as moment from 'moment';
import { element } from 'protractor';
//import { Evento } from 'src/app/models/models';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { AddPage } from '../add/add.page';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-evento-home',
  templateUrl: './evento-home.page.html',
  styleUrls: ['./evento-home.page.scss'],
})
export class EventoHomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public dinner: string;
  textSearch = '';
  check: boolean
  fecha:any
  result = 'close'
  arrayEvent:any[] = []
  arrayEventToday:any[] = []
  arrayEventTomorrow:any[] = []
  arrayEventTomorrowMore:any[] = []

  arrayEventToday1:any[] = []
  arrayEventTomorrow1:any[] = []
  arrayEventTomorrowMore1:any[] = []

  hoySearch:any
  manSearch:any
  masSearch:any

  /*arrayEvent =[{
    codigo:11,
    fecha:moment().format('DD/MM/YYYY'),
    animal_codigo: 11,
    tipo_evento: 'celo',
    completar: 'close'
  },{
    codigo:12,
    fecha:moment().format('DD/MM/YYYY'),
    animal_codigo: 12,
    tipo_evento: 'palpacion',
    completar: 'close'
  },
  ]*/
  completar:any[] = []
  evento:any
  filter = false
  constructor(private modalController: ModalController, private insomnia: Insomnia,public navCtrl: NavController,private router: Router,private alertCtrl: AlertController,private dbContext: DbcontextService,public loadingCtrl: LoadingController,) { }

  ngOnInit() {
   // this.load()
  }


  async load(){
    this.arrayEventToday = []
    this.arrayEventTomorrow = []
    this.arrayEventTomorrowMore = []
    this.presentLoading();
    this.arrayEvent = []
      this.arrayEvent = await this.dbContext.getDataFromTable(Tables.Eventos) 
    if(this.arrayEvent.length !== 0){ 
      this.arrayEvent.forEach(element=>{
          if(moment().format('DD-MM-YYYY') == element.fecha){
           // element.completar = 'checkmark'
           // this.dbContext.completarEvento(Tables.Eventos,element.codigo)
            this.arrayEventToday.push(element)
            console.log(this.arrayEventToday)
            this.arrayEventToday1 = this.arrayEventToday
            
          }
          if(moment().add(1,'day').format('DD-MM-YYYY') == element.fecha){
            this.arrayEventTomorrow.push(element)
            console.log(this.arrayEventTomorrow)
            this.arrayEventTomorrow1 = this.arrayEventTomorrow
          }

          if(moment().add(1,'day').format('DD-MM-YYYY') < element.fecha || moment().add(1,'day').format('MM') < moment(element.fecha).format('MM')){
            this.arrayEventTomorrowMore.push(element)
            console.log(this.arrayEventTomorrowMore)
            this.arrayEventTomorrowMore1 = this.arrayEventTomorrowMore
          }
      })
      console.log(this.arrayEvent)
    }   
  }


  async loadF(){
    this.arrayEventToday = []
    this.arrayEventTomorrow = []
    this.arrayEventTomorrowMore = []
    this.presentLoading();
    if(this.arrayEvent.length == 0){
      this.arrayEvent = await this.dbContext.getDataFromTable(Tables.Eventos)
    }
    if(this.arrayEvent.length !== 0){ 
      this.arrayEvent.forEach(element=>{
          if(moment().format('DD-MM-YYYY') == element.fecha){
            element.completar = 'checkmark'
            this.dbContext.completarEvento(Tables.Eventos,element.codigo)
            this.arrayEventToday.push(element)
            console.log(this.arrayEventToday)
            this.arrayEventToday1 = this.arrayEventToday
            
          }
          if(moment().add(1,'day').format('DD-MM-YYYY') == element.fecha){
            this.arrayEventTomorrow.push(element)
            console.log(this.arrayEventTomorrow)
            this.arrayEventTomorrow1 = this.arrayEventTomorrow
          }
          
          if((moment().add(2,'day').format('DD-MM-YYYY') < element.fecha)){
            this.arrayEventTomorrowMore.push(element)
            console.log(this.arrayEventTomorrowMore)
            this.arrayEventTomorrowMore1 = this.arrayEventTomorrowMore
          } 
      })
    }
  }

  
  eventos(item){
    if(item.tipo_evento == 'celo'){
        return this.evento = 'Celo'
    }else if(item.tipo_evento == 'parto'){
      return this.evento = 'Parto'
    }else if(item.tipo_evento == 'palpacion'){
      return this.evento = 'Palpación'
    }else if(item.tipo_evento == 'servicio'){
      return this.evento = 'Servicio'
    }else if(item.tipo_evento == 'salud'){
      return this.evento = 'Salud'
    }
  }

  fechaFormat(fecha){
    this.fecha = moment(fecha).format('DD-MM-YYYY');
    return this.fecha
  }


  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
    this.load()
  }
  


  async presentAlertPositivo(item) {
    const alert = await this.alertCtrl.create({
      header: '',
      message: `Completar este evento?`,
      buttons: [
        {
          text: 'Editar',
          role: 'Editar',
          cssClass: 'secondary',
          handler: () => {
            localStorage.setItem("evento-codigo",JSON.stringify(item.codigo))
            localStorage.setItem("evento-fecha",JSON.stringify(item.fecha))
            localStorage.setItem("evento-animal_codigo",JSON.stringify(item.animal_codigo))
            localStorage.setItem("evento-tipo_evento",JSON.stringify(item.tipo_evento))
            this.navCtrl.navigateForward('/evento-home/edit')
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.arrayEvent.forEach(element=>{
              if(element.codigo == item.codigo){
                if(item.tipo_evento == 'parto' && item.completar == 'close'){
                  this.navCtrl.navigateForward('/reproduction/birth-complete')
                  localStorage.setItem("completar-parto",item.animal_codigo)
                  localStorage.setItem("completar-parto-fecha",item.fecha)
                  this.completar.push(item.codigo)
                  element.completar = 'checkmark'
                   this.dbContext.completarEvento(Tables.Eventos,item.codigo)

                }else if(item.tipo_evento == 'palpacion' && item.completar == 'close'){
                  this.navCtrl.navigateForward('/reproduction/palpacion-complete')
                  localStorage.setItem("completar-palpacion",item.animal_codigo)
                  localStorage.setItem("completar-palpacion-fecha",item.fecha)
                  this.completar.push(item.codigo)
                  element.completar = 'checkmark'
                   this.dbContext.completarEvento(Tables.Eventos,item.codigo)
                }else if(item.tipo_evento == 'celo' && item.completar == 'close'){
                  this.navCtrl.navigateForward('/reproduction/celos-complete')
                  localStorage.setItem("completar-celo",item.animal_codigo)
                  localStorage.setItem("completar-celo-fecha",item.fecha)
                  this.completar.push(item.codigo)
                  element.completar = 'checkmark'
                   this.dbContext.completarEvento(Tables.Eventos,item.codigo)
                }else if(item.tipo_evento == 'servicio' && item.completar == 'close'){
                  this.navCtrl.navigateForward('/reproduction/services-complete')
                  localStorage.setItem("completar-servicio",item.animal_codigo)
                  localStorage.setItem("completar-servicio-fecha",item.fecha)
                  this.completar.push(item.codigo)
                  element.completar = 'checkmark'
                  this.dbContext.completarEvento(Tables.Eventos,item.codigo)
                }else if(item.tipo_evento == 'salud' && item.completar == 'close'){
                  this.navCtrl.navigateForward('health/sickness-complete')
                  localStorage.setItem("completar-salud",item.animal_codigo)
                  localStorage.setItem("completar-salud-fecha",item.fecha)
                  this.completar.push(item.codigo)
                  element.completar = 'checkmark'
                  this.dbContext.completarEvento(Tables.Eventos,item.codigo)
                }
              }
            })
          }
        }
      ]
    });

    await alert.present();
  }


  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      //message: 'Loading...',
      spinner: 'bubbles',
      duration: 2000
    });
    return await loading.present();
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  delete(id){
    this.dbContext.deleteFromTable(Tables.Eventos,id)
  }

  searchHoy(hoySearch){
    this.arrayEventToday = this.arrayEventToday1.filter(element=> String(element.animal_codigo).startsWith(`${hoySearch}`))
  }

  searchMan(manSearch){
    this.arrayEventTomorrow = this.arrayEventTomorrow1.filter(element=> String(element.animal_codigo).startsWith(`${manSearch}`))
  }

  searchMas(masSearch){
    this.arrayEventTomorrowMore = this.arrayEventTomorrowMore1.filter(element=> String(element.animal_codigo).startsWith(`${masSearch}`))
  }

  

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalFilterPage,
      backdropDismiss: false,
    });
    modal.onWillDismiss().then(result=>{
        this.arrayEvent = []
        this.arrayEvent = result.data
        if(this.arrayEvent.length == 0){
          alert("No hay datos para mostrar")
          this.load()
        }else{
          this.loadF()
        }
      
    })
    return await modal.present();
  }


  async atender(model) {
    const modal = await this.modalController.create({
      component: AddPage,
      componentProps: {
        model: model
      }
    });
    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      //this.check = dataReturned.data
      this.load()
      console.log('Receive: ', this.dinner);
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending: ', model);
    });
  }



  /*async openModalWithData(model) {
    const modal = await this.modalController.create({
      component: ModalFilterPage,
      componentProps: {
        lunch: model
      }
    });
    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      this.dinner = dataReturned.data;
      console.log('Receive: ', this.dinner);
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending: ', model);
    });
  }*/

}
