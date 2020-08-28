import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { ModalEventPage } from 'src/app/modal-event/modal-event.page';
import { Tables } from 'src/app/models/enums';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';

@Component({
  selector: 'app-celos-complete',
  templateUrl: './celos-complete.page.html',
  styleUrls: ['./celos-complete.page.scss'],
})
export class CelosCompletePage implements OnInit {

  datePickerObj: any = {};
  model ={
    code:null,
    animal_codigo: null,
    celos: null,
    fecha:null,
   // negocio_id: null,
  };
  data ={
    code:null,
    animal_code: null,
    negocio_id: null,
    fecha:null,
   // negocio_id: null,
  };

  sincronizacion ={
    nombre:null,
    codigo_remoto:null,
    fecha:moment().format('DD/MM/YYYY'),
    id_usuario:null,
    data:null,
    accion:null,
    active:true
  };
  animal_codigo:any

  evento ={
    fecha:null,
    animal_codigo: null,
    tipo_evento: null,
  };
  historico = {
    animal_codigo: null,
    active:null
  }
  arrayNegocio:Array<any> = [];
  celo:any
  arrayAnimal:any[] = []
  arrayResult:any[] = []
  filter = false
  editar = false;
  constructor(public modalCtrl: ModalController,private insomnia: Insomnia,private alertCtrl: AlertController, public navCtrl: NavController, private dbContext: DbcontextService) { }

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
    this.celo = localStorage.getItem("celo")
    if(localStorage.getItem("completar-celo") !== undefined && localStorage.getItem("completar-celo-fecha") !== undefined){
      this.model.animal_codigo = localStorage.getItem("completar-celo")
      this.model.fecha = localStorage.getItem("completar-celo-fecha")
      this.model.fecha = moment(this.model.fecha, 'DD-MM-YYYY').toISOString()
      this.editar = true
    }
  }

  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
  }


  async loadData(){
    this.arrayNegocio = await  this.dbContext.getDataFromTable(Tables.Negocio);
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

  async saveData(){
    console.log(this.model)
    this.data.fecha = moment(this.model.fecha).format('DD-MM-YYYY HH:mm:ss')
    this.model.fecha = moment(this.model.fecha).format('DD-MM-YYYY')
    await this.dbContext.insertDataInto(Tables.Celos, this.model);
    await this.dbContext.estadoAnimal(Tables.Animal,this.model.animal_codigo,1)

    this.data.code = Math.floor(Math.random()*1000)+1
    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
    this.data.animal_code = this.model.animal_codigo
    this.sincronizacion.nombre = 'celos'
    this.sincronizacion.data = JSON.stringify(this.data)
    this.sincronizacion.accion = 'INSERT'
  await  this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
    this.navCtrl.navigateForward('/evento-home')
    this.model ={
      code:null,
      animal_codigo: null,
      celos: null,
      fecha:moment().format('DD/MM/YYYY'),
    //  negocio_id: null,
    };
    this.data ={
      code:null,
      animal_code: null,
      negocio_id: null,
      fecha:null,
     // negocio_id: null,
    };
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
        this.model.animal_codigo = dataReturned.data.animal_codigo;
      }else{
        this.model.animal_codigo = animal_codigo
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
  }
  addCodigo(codigo){
      this.model.animal_codigo = codigo
      this.filter = false
      this.arrayResult = []
  }


  async presentAlertPositivo() {
    this.model.celos = 1
    this.evento.animal_codigo = this.model.animal_codigo
            this.evento.fecha = this.model.fecha
            this.evento.tipo_evento = 'servicio'
    this.historico.animal_codigo = this.model.animal_codigo
    this.historico.active = 1
    await this.dbContext.insertDataInto(Tables.Historico,this.historico)
    const modal = await this.modalCtrl.create({
      component: ModalEventPage,
      componentProps: {
        header: 'La vaca está preñada',
        message: 'Se requiere planificar un  nuevo servicio en',
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
      header: '!La vaca no está preñada!',
      message: `Se requiere revisar celos en ${this.celo} días`,
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
            this.evento.animal_codigo = this.model.animal_codigo
            this.evento.fecha = this.model.fecha
            this.evento.tipo_evento = `celo`
            this.saveData()
            this.dbContext.insertDataInto(Tables.Eventos, this.evento);
          }
        }
      ]
    });

    await alert.present();*/
    
  }


  async presentAlertNegativo() {
    this.model.celos = 0
    this.evento.animal_codigo = this.model.animal_codigo
            this.evento.fecha = this.model.fecha
            this.evento.tipo_evento = 'celo'
    this.historico.animal_codigo = this.model.animal_codigo
    this.historico.active = 0
    await this.dbContext.insertDataInto(Tables.Historico,this.historico)
    const modal = await this.modalCtrl.create({
      component: ModalEventPage,
      componentProps: {
        header: 'La vaca no está en celo',
        message: 'Se requiere planificar un  chequeo en',
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
      message: `!La vaca no está en celo!. Se requiere planificar un  chequeo en ${this.celo} días`,
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
            this.evento.animal_codigo = this.model.animal_codigo
            this.evento.fecha = this.model.fecha
            this.evento.tipo_evento = `celo`
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


}
