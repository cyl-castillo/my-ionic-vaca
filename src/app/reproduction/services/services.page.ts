/* tslint:disable:quotemark */
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import {ModalController, AlertController, NavController} from '@ionic/angular';
import {Tables} from '../../models/enums';
import {DbcontextService} from '../../services/dbcontext.service';
import { ModalEventPage } from 'src/app/modal-event/modal-event.page';
import { SearchAnimalCodigoPage } from 'src/app/search-animal-codigo/search-animal-codigo.page';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  datePickerObj: any = {};
  model ={
    code:null,
    fecha:null,
    animal_inseminador: null,
    animal_inseminado: null,
    servicioId: null,
    codigo_semen:null,
    inseminador_codigo:null
  };
  data ={
    code:null,
    fecha:null,
    animal_inseminado: null,
    animal_inseminador:0,
    semen_id:0,
    personal_inseminador:null,
    negocio_id:null,
    tipo_servicio_id:null
  };
  historico = {
    animal_codigo: null,
    active:null
  }
  arrayAnimal:any[] = []
  arrayResult:any[] = []
  arrayResult1:any[] = []
  arrayResult2:any[] = []
  filter = false
  filter1 = false
  filter2 = false
  evento ={
    fecha:null,
    animal_codigo: null,
    tipo_evento: null,
  };
  animal_codigo:any
  animal_codigo1:any
  arrayInseminador:Array<any> = [];

  isSelectedService = false;
  isArtificial = false;
  servicio:any
  editar = false;
  requiredFinca = true
  requiredFinca1 = true

  animal_codigo2 = true
  codigo_semen = true
  animal_inseminador = true
  animal_inseminado = true
  arrayResult3: any[] = [];

  sincronizacion ={
    nombre:null,
    codigo_remoto:null,
    fecha:moment().format('DD/MM/YYYY'),
    id_usuario:null,
    data:null,
    accion:null,
    active:true
  };

  constructor(
      public modalCtrl: ModalController,private dbContext: DbcontextService, private insomnia: Insomnia,private alertCtrl: AlertController, public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.datePickerObj = {
      dateFormat: 'DD/MM/YYYY',
        fromDate: new Date('01/01/2000'), // default null
        toDate: new Date('01/01/2100'), // default null
        showTodayButton: true, // default true
        closeOnSelect: true, // default false
        disableWeekDays: [], // default []
        mondayFirst: true, // default false
        setLabel: 'S',  // default 'Set'
        todayLabel: 'Hoy', // default 'Today'
        closeLabel: 'Cerrar', // default 'Close'
        disabledDates: [], // default []
      // tslint:disable-next-line:max-line-length
        monthsList: ['Enero', "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        weeksList: ["D", "L", "M", "M", "J", "V", "S"],
        clearButton : true , // default true
        yearInAscending: true, // Default false
        btnCloseSetInReverse: true, // Default false
        arrowNextPrev: {
          nextArrowSrc: 'assets/images/arrow_right.svg',
          prevArrowSrc: 'assets/images/arrow_left.svg'
        },
    };
    this.loadData();
    this.servicio = localStorage.getItem("servicio")
  }

  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
  }

  selectFinca1(){
    this.requiredFinca1 = false
  }

  async loadData(){
    this.arrayInseminador = await  this.dbContext.getDataFromTable(Tables.Inseminadores);
  }

  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: {
        objConfig: this.datePickerObj,
        selectedDate: this.model.fecha
      }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss()
        .then((data) => {
          console.log(data);
          if (moment(data.data.date).isValid()) {
            this.model.fecha = data.data.date;
          }
        });
  }

  onChangeService(event) {
    console.log(event);
    if (event.detail.value === '1') {
      this.isArtificial = true;
      this.model.animal_inseminador = null;
    } else {
      this.isArtificial = false;
      this.model.codigo_semen = null;
    }
    this.isSelectedService = true;
    this.requiredFinca1 = false
  }

  async saveData(){
    console.log(this.model)
    this.data.fecha = moment(this.model.fecha).format('DD-MM-YYYY HH:mm:ss')
    this.model.fecha = moment(this.model.fecha).format('DD-MM-YYYY')
    await this.dbContext.insertDataInto(Tables.Servicios, this.model);
    await this.dbContext.estadoAnimal(Tables.Animal,this.model.animal_inseminado,2)

    this.data.code = Math.floor(Math.random()*1000)+1
    this.data.animal_inseminado = this.model.animal_inseminado
    this.data.semen_id = this.model.codigo_semen
    this.data.animal_inseminador = this.model.animal_inseminador
    this.data.personal_inseminador = this.model.inseminador_codigo
    this.data.tipo_servicio_id = this.model.servicioId
    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
    this.sincronizacion.nombre = 'servicios'
                  this.sincronizacion.data = JSON.stringify(this.data)
                  this.sincronizacion.accion = 'INSERT'
                await  this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

    this.model ={
      code:null,
      fecha:moment().format('DD/MM/YYYY'),
      animal_inseminador: null,
      animal_inseminado: null,
      servicioId: null,
      codigo_semen:null,
      inseminador_codigo:null
    };
    this.data ={
      code:null,
      fecha:null,
      animal_inseminado: null,
      animal_inseminador:null,
      semen_id:null,
      personal_inseminador:null,
      negocio_id:null,
      tipo_servicio_id:null
    };
    this.isSelectedService = false;
    this.isArtificial = false;
  }


  async presentAlertPositivo() {
    this.evento.animal_codigo = this.model.animal_inseminado
            this.evento.fecha = this.model.fecha
            this.evento.tipo_evento = 'palpacion'
    this.historico.animal_codigo = this.model.animal_inseminado
    this.historico.active = 1
    await this.dbContext.insertDataInto(Tables.Historico,this.historico)
    const modal = await this.modalCtrl.create({
      component: ModalEventPage,
      componentProps: {
        header: 'Servicio Positivo',
        message: 'Se requiere planificar una palpación en ',
        eventos: this.evento
      },
      cssClass: 'searchmodal',
      backdropDismiss: false
    });
    this.historico = {
      animal_codigo: null,
      active:null
    }
    modal.onWillDismiss().then(dataReturned => {
      this.saveData()
    });
    return await modal.present().then(_ => {

    });
    /*const alert = await this.alertCtrl.create({
      header: 'Servicio Positivo',
      message: `!Se requiere planificar una palpación!`,
      inputs: [ 
        { 
        name: 'manual', 
        type: 'checkbox', 
        label: 'Manual', 
        value: 'manual', 
        checked: true,
        }, 
        { 
        name: 'ultrasonido', 
        type: 'checkbox', 
        label: 'Ultrasonido', 
        value: 'ultrasonido', 
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.navCtrl.navigateForward('/reproduction')
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.evento.animal_codigo = this.model.animal_inseminado
            this.evento.fecha = this.model.fecha
            this.evento.tipo_evento = `servicio`
            this.saveData()
            this.dbContext.insertDataInto(Tables.Eventos, this.evento);
          }
        }
      ]
    });

    await alert.present();*/
  }


  async presentAlertNegativo() {
    this.evento.animal_codigo = this.model.animal_inseminado
            this.evento.fecha = this.model.fecha
            this.evento.tipo_evento = 'celo'

    this.historico.animal_codigo = this.model.animal_inseminado
    this.historico.active = 0
    await this.dbContext.insertDataInto(Tables.Historico,this.historico)
    const modal = await this.modalCtrl.create({
      component: ModalEventPage,
      componentProps: {
        header: 'Servicio Negativo',
        message: 'Se requiere planificar un  nuevo servicio en ',
        eventos: this.evento
      },
      cssClass: 'searchmodal',
      backdropDismiss: false
    });
    this.historico = {
      animal_codigo: null,
      active:null
    }
    modal.onWillDismiss().then(dataReturned => {
      this.saveData()
    });
    return await modal.present().then(_ => {

    });
    /*const alert = await this.alertCtrl.create({
      header: '!Servicio Negativo!',
      message: `<strong>Se requiere planificar un  nuevo servicio en ${this.servicio} días`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.navCtrl.navigateForward('/reproduction')
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.evento.animal_codigo = this.model.animal_inseminado
            this.evento.fecha = this.model.fecha
            this.evento.tipo_evento = `servicio`
            this.saveData()
            this.dbContext.insertDataInto(Tables.Eventos, this.evento);
          }
        }
      ]
    });

    await alert.present();*/
  }

  cancelar(){
    this.navCtrl.navigateForward('/reproduction')
  }


  /*async searchData(animal_codigo){
    const modal = await this.modalCtrl.create({
      component: SearchAnimalCodigoPage,
      componentProps: {
        animal_codigo: animal_codigo,
      },
      cssClass: 'searchmodal',
      backdropDismiss: false
    });
    modal.onWillDismiss().then(dataReturned => {
      if(dataReturned.data !== null){
        this.model.animal_inseminado = dataReturned.data.animal_codigo;
      }else{
        this.model.animal_inseminado = animal_codigo
      }
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending: ', this.animal_codigo);
    });
  }*/

  async searchData(animal_codigo){
    this.arrayAnimal = await  this.dbContext.getDataFromTable(Tables.Animal);
    if(this.arrayAnimal.length > 0){
      this.filter = true
      console.log(animal_codigo)
      console.log(this.arrayAnimal)
      this.arrayResult = this.arrayAnimal.filter(element=> String(element.animal_codigo).startsWith(`${animal_codigo}`) && element.sexo == 'Hembra')
      console.log(this.arrayResult)
    }
    this.animal_inseminado = false
  }
  addCodigo(codigo){
      this.model.animal_inseminado = codigo
      this.filter = false
      this.arrayResult = []
  }


  async searchDataA(animal_codigo){
    this.arrayAnimal = await  this.dbContext.getDataFromTable(Tables.Animal);
    if(this.arrayAnimal.length > 0){
      this.filter1 = true
      console.log(animal_codigo)
      console.log(this.arrayAnimal)
      this.arrayResult1 = this.arrayAnimal.filter(element=> String(element.animal_codigo).startsWith(`${animal_codigo}`))
      console.log(this.arrayResult1)
    }
    this.animal_codigo2 = false
  }
  addCodigo1(codigo){
      this.animal_codigo1 = codigo
      this.filter1 = false
      this.arrayResult1 = []
  }


  async searchDataT(animal_codigo){
    this.arrayAnimal = await  this.dbContext.getDataFromTable(Tables.Animal);
    if(this.arrayAnimal.length > 0){
      this.filter2 = true
      console.log(animal_codigo)
      console.log(this.arrayAnimal)
      this.arrayResult2 = this.arrayAnimal.filter(element=> String(element.animal_codigo).startsWith(`${animal_codigo}`) && element.sexo == 'Macho')
      console.log(this.arrayResult2)
    }
    this.animal_inseminador = false
  }
  addCodigo2(codigo){
      this.model.animal_inseminador = codigo
      this.filter2 = false
      this.arrayResult2 = []
  }

  async searchDataS(animal_codigo){
    this.arrayAnimal = await  this.dbContext.getDataFromTable(Tables.Animal);
    if(this.arrayAnimal.length > 0){
      this.filter1 = true
      console.log(animal_codigo)
      console.log(this.arrayAnimal)
      this.arrayResult3 = this.arrayAnimal.filter(element=> String(element.animal_codigo).startsWith(`${animal_codigo}`) && element.sexo == 'Macho')
      console.log(this.arrayResult3)
    }
    this.codigo_semen = false
  }
  addCodigo3(codigo){
      this.model.codigo_semen = codigo
      this.filter1 = false
      this.arrayResult3 = []
  }

  async searchData1(animal_codigo1){
    const modal = await this.modalCtrl.create({
      component: SearchAnimalCodigoPage,
      componentProps: {
        animal_codigo: animal_codigo1
      },
      backdropDismiss: false
    });
    modal.onWillDismiss().then(dataReturned => {
      this.model.animal_inseminador = dataReturned.data.animal_codigo;
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending: ', this.animal_codigo);
    });
  }

}
