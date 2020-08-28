import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {ModalController, AlertController, NavController} from '@ionic/angular';
import {Ionic4DatepickerModalComponent} from '@logisticinfotech/ionic4-datepicker';
import {DbcontextService} from '../../services/dbcontext.service';
import {Tables} from '../../models/enums';
import { SearchAnimalCodigoPage } from 'src/app/search-animal-codigo/search-animal-codigo.page';
import { ModalEventPage } from 'src/app/modal-event/modal-event.page';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { element } from 'protractor';

@Component({
  selector: 'app-birth',
  templateUrl: './birth.page.html',
  styleUrls: ['./birth.page.scss'],
})
export class BirthPage implements OnInit {

  datePickerObj: any = {};
  model ={
    code:null,
    fecha:null,
    codigoMadre: null,
    sexo: null,
    razaId: null,
    codigoCria: null,
    parto:null
  };

  data ={
    code:null,
    fecha:null,
    madre_code: null,
    sexo: null,
    raza_id: null,
    animal_nacido: null,
    negocio_id:null,
    positivo: false,
  };

  data1 ={
    code:null,
    fecha_nacimiento:null,
    sexo:null,
    lote_nacimiento_id:null,
    lote_actual_id: null,
    raza_codigo:null,
    madre_codigo:null,
    padre_codigo:null,
    temporal_id:null,
    inventario_id:null,
    temporal:false,
    estado_id:null,
    negocio_id:null,
    locomocion_code:null
  };

  sincronizacion ={
    nombre:null,
    codigo_remoto:null,
    fecha:moment().format('DD/MM/YYYY'),
    id_usuario:null,
    data:null,
    accion:null,
    active: true
  };

  historico = {
    animal_codigo: null,
    active:null
  }

  codigoMadre = true
  codigoCria = true
  arrayResult1:any[] = []

  animal ={
    animal_codigo: null,
    fecha:null,
    sexo:null,
    lote_nacimientoId:null,
    lote_actual_Id: null,
    razaId:null,
    madreId:null,
    padreId:null,
    idTemporal:null,
    idInventario:null,
    temp:null,
    ultimo_estado:null
  };
  temp:boolean
  

  ingreso = {
    fecha: null,
    animal_codigo:null,
    fincaId: null,
    loteId: null

  }
  evento ={
    fecha:null,
    animal_codigo: null,
    tipo_evento: null,
  };
  arrayRaza:any[] = [];
  animal_codigo:any
  celo:any
  arrayAnimal:any[] = []
  arrayResult:any[] = []
  arrayServicio:any[] = []
  arrayLote_Parto:any[] = []
  filter = false
  editar =false
  requiredFinca = true
  requiredFinca1 = true

  parto_postivo = false


  constructor(
      public modalCtrl: ModalController, private insomnia: Insomnia,private dbContext: DbcontextService, private alertCtrl: AlertController, public navCtrl: NavController
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
    this.celo = localStorage.getItem("celo")
  }

  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
    this.loadData();
  }

  updateTemp(){
    this.animal.temp = this.temp
    console.log(this.animal.temp)
  }

  async loadData(){
    if(this.arrayRaza.length == 0){
      this.arrayRaza = await  this.dbContext.getDataFromTable(Tables.Raza);
    }
    this.arrayServicio = await  this.dbContext.getDataFromTable(Tables.Servicios);
    
    if(this.arrayLote_Parto.length == 0){
      this.arrayLote_Parto = await this.dbContext.getDataFromTable(Tables.Lote_Parto)
    }
  }

  selectFinca(){
    this.requiredFinca = false
  }

  selectFinca1(){
    this.requiredFinca1 = false
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

  async saveDataPostivo(){
    console.log(this.model)
    if(this.arrayServicio.length != 0){
      this.arrayServicio.forEach(element=>{
        if(element.animal_inseminado == this.model.codigoMadre){
          if(element.codigo_semen !== null){
            this.animal.padreId = element.codigo_semen
          }else{
            this.animal.padreId = element.animal_inseminador
          }
          
        }
      })
    }else{
      this.animal.padreId = 1
    }
      this.animal.animal_codigo = this.model.codigoCria
      //this.animal.fecha = this.model.fecha
      this.animal.fecha = moment(this.model.fecha).format('DD-MM-YYYY')  
      this.animal.madreId = this.model.codigoMadre
      this.animal.sexo = this.model.sexo
      this.animal.razaId = this.model.razaId
      this.animal.ultimo_estado = 6


      this.data1.code = this.model.codigoCria
      this.data1.sexo =  this.animal.sexo
      this.data1.lote_nacimiento_id = this.animal.lote_nacimientoId
      this.data1.lote_actual_id = this.animal.lote_actual_Id
      this.data1.raza_codigo = this.animal.razaId
      this.data1.madre_codigo = this.animal.madreId
      this.data1.padre_codigo = this.animal.padreId
      this.data1.temporal_id = this.animal.idTemporal
      this.data1.inventario_id = this.animal.idInventario
      this.data1.temporal = this.animal.temp
      this.data1.estado_id = this.animal.ultimo_estado
      this.data1.negocio_id = JSON.parse(localStorage.getItem("negocio"))
      this.data1.fecha_nacimiento = moment(this.model.fecha).format('DD-MM-YYYY HH:mm:ss')
   
      this.sincronizacion.nombre = 'animales'
                    this.sincronizacion.data = JSON.stringify(this.data1)
                    this.sincronizacion.accion = 'INSERT'
                  await  this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
     

      this.ingreso.fecha = this.model.fecha
      this.ingreso.animal_codigo = this.model.codigoCria
      if(JSON.parse(localStorage.getItem("lote")) !== undefined){
        this.ingreso.loteId = JSON.parse(localStorage.getItem("lote"))
        this.animal.lote_actual_Id = JSON.parse(localStorage.getItem("lote"))
      }
      
      await this.dbContext.insertDataInto(Tables.Animal, this.animal);

      await this.dbContext.insertDataInto(Tables.Ingreso_Finca,this.ingreso)
      this.model.parto = 1

    this.data.fecha = moment(this.model.fecha).format('DD-MM-YYYY HH:mm:ss')
    this.model.fecha = moment(this.model.fecha).format('DD-MM-YYYY')
    await this.dbContext.insertDataInto(Tables.Parto, this.model);

    this.historico.animal_codigo = this.model.codigoMadre
    this.historico.active = 1
    await this.dbContext.insertDataInto(Tables.Historico,this.historico)
    this.data.code = Math.floor(Math.random()*1000)+1
    this.data.animal_nacido = this.model.codigoCria
    this.data.madre_code = this.model.codigoMadre
    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
    this.data.raza_id = this.model.razaId
    this.data.sexo = this.model.sexo
    this.data.positivo = true
           this.sincronizacion.nombre = 'partos'
                  this.sincronizacion.data = JSON.stringify(this.data) 
                  this.sincronizacion.accion = 'INSERT'
                  await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
    
    this.model ={
      code:null,
      fecha:moment().format('DD/MM/YYYY'),
      codigoCria: null,
      codigoMadre: null,
      razaId: null,
      sexo:null,
      parto:null
    };
    this.historico = {
      animal_codigo: null,
      active:null
    }
    this.data ={
      code:null,
      fecha:null,
      madre_code: null,
      sexo: null,
      raza_id: null,
      animal_nacido: null,
      negocio_id:null,
      positivo: false,
    };
  }


  async saveDataNegativo(){
    console.log(this.model)
    
    this.arrayServicio.forEach(element=>{
      if(element.animal_inseminado == this.model.codigoMadre){
        this.animal.padreId = element.codigo_semen || element.animal_inseminador
      }
    })
    this.model.parto = 1
    this.data.fecha = moment(this.model.fecha).format('DD-MM-YYYY HH:mm:ss')
    this.model.fecha = moment(this.model.fecha).format('DD-MM-YYYY')
    await this.dbContext.insertDataInto(Tables.Parto, this.model);

    this.historico.animal_codigo = this.model.codigoMadre
    this.historico.active = 0
    await this.dbContext.insertDataInto(Tables.Historico,this.historico)

    this.data.code = Math.floor(Math.random()*1000)+1
    this.data.animal_nacido = this.model.codigoCria
    this.data.madre_code = this.model.codigoMadre
    this.data.negocio_id = this.dbContext.getNegocioId()
    this.data.raza_id = this.model.razaId
    this.data.sexo = this.model.sexo
    this.sincronizacion.nombre = 'partos'
                  this.sincronizacion.data = JSON.stringify(this.data)
                  this.sincronizacion.accion = 'INSERT'
                  await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
    
    this.model ={
      code:null,
      fecha:moment().format('DD/MM/YYYY'),
      codigoCria: null,
      codigoMadre: null,
      razaId: null,
      sexo:null,
      parto:null
    };
    this.historico = {
      animal_codigo: null,
      active:null
    }
    this.data ={
      code:null,
      fecha:null,
      madre_code: null,
      sexo: null,
      raza_id: null,
      animal_nacido: null,
      negocio_id:null,
      positivo: false,
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
        this.model.codigoMadre = dataReturned.data.animal_codigo;
      }else{
        this.model.codigoMadre = animal_codigo
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
    this.codigoMadre = false
  }
  addCodigo(codigo){
      this.model.codigoMadre = codigo
      this.filter = false
      this.arrayResult = []
  }

  async searchDataC(animal_codigo){
    this.arrayAnimal = await  this.dbContext.getDataFromTable(Tables.Animal);
    if(this.arrayAnimal.length > 0){
      this.filter = true
      console.log(animal_codigo)
      console.log(this.arrayAnimal)
      this.arrayResult1 = this.arrayAnimal.filter(element=> String(element.animal_codigo).startsWith(`${animal_codigo}`))
      console.log(this.arrayResult1)
    }
    this.codigoCria = false
  }
  addCodigo1(codigo){
      this.model.codigoCria = codigo
      this.filter = false
      this.arrayResult1 = []
  }

  async presentAlertPositivo() {
    
    this.evento.animal_codigo = this.model.codigoMadre
    this.evento.fecha = this.model.fecha
    this.evento.tipo_evento = 'celo'
    const modal = await this.modalCtrl.create({
      component: ModalEventPage,
      componentProps: {
        header: 'Se realizo un parto positivo!',
        message: 'Es necesario realizar un chequeo de celo dentro de ',
        eventos: this.evento
      },
      cssClass: 'searchmodal',
      backdropDismiss: false
    });
    modal.onWillDismiss().then(dataReturned => {
      this.saveDataPostivo()
      this.parto_postivo = true
    });
    return await modal.present().then(_ => {

    });

    /*const alert = await this.alertCtrl.create({
      header: '!Se realizo un parto positivo!',
      message: `Es necesario realizar un chequeo de celo dentro de ${this.celo} días`,
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
            this.saveData()
            this.evento.animal_codigo = this.model.codigoCria
            this.evento.fecha = this.model.fecha
            this.evento.tipo_evento = `parto`
            this.dbContext.insertDataInto(Tables.Eventos, this.evento);
          }
        }
      ]
    });

    await alert.present();*/
  }


  async presentAlertNegativo() {
    this.evento.animal_codigo = this.model.codigoMadre
            this.evento.fecha = this.model.fecha
            this.evento.tipo_evento = 'celo'
    const modal = await this.modalCtrl.create({
      component: ModalEventPage,
      componentProps: {
        header: 'La vaca no esta preñada',
        message: 'Se planifica un control de celo en ',
        eventos: this.evento
      },
      cssClass: 'searchmodal',
      backdropDismiss: false
    });
    modal.onWillDismiss().then(dataReturned => {
      this.saveDataNegativo()
    });
    return await modal.present().then(_ => {

    });
    /*const alert = await this.alertCtrl.create({
      header: '!Se realizo un parto negativo!',
      message: `Es necesario realizar un chequeo de celo dentro de ${this.celo} días`,
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
            this.saveData()
            this.evento.animal_codigo = this.model.codigoCria
            this.evento.fecha = this.model.fecha
            this.evento.tipo_evento = `parto`
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
