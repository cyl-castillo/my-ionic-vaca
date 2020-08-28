import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {ModalController} from '@ionic/angular';
import {Ionic4DatepickerModalComponent} from '@logisticinfotech/ionic4-datepicker';
import {DbcontextService} from '../../services/dbcontext.service';
import {Tables} from '../../models/enums';
import { SearchAnimalCodigoPage } from 'src/app/search-animal-codigo/search-animal-codigo.page';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-feeding',
  templateUrl: './feeding.page.html',
  styleUrls: ['./feeding.page.scss'],
})
export class FeedingPage implements OnInit {

  datePickerObj: any = {};
  model ={
    code:null,
    fecha:null,
    leche: null,
    concentrado: null,
    peso: null,
    animal_codigo: null
  };

  data ={
    code:null,
    fecha:null,
    leche: null,
    concentrado: null,
    peso: null,
    animal_id: null,
    negocio_id:null
  };

  cria ={
    animal_codigo: null,
    fecha:null,
    sexo:null,
    lote_nacimientoId:null,
    lote: null,
    raza:null,
    madreId:null,
    padreId:null,
    idTemporal:null,
    idInventario:null,
  };
  arrayAnimal:any[] = []
  arrayLactancia:any[] = []
  arrayResult:any[] = []
  arrayResult1:any[] = []
  arrayResult2:any[] = []
  arrayResult3:any[] = []
  filterCodigo = false
  filterLeche = false
  filterPeso = false
  filterConcentrado = false
  cantDia:any
  dia = false
  animal_codigo = true
  leche = true
  concentrado = true
  peso = true

  sincronizacion ={
    nombre:null,
    codigo_remoto:null,
    fecha:moment().format('DD/MM/YYYY'),
    id_usuario:null,
    data:null,
    accion:null
  };
  constructor(
      public modalCtrl: ModalController, private dbContext: DbcontextService,private insomnia: Insomnia
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
    //this.loadData()
  }

  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
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

  /*async searchData(){
    //this.cria = await this.dbContext.getElementByAttrTable("animal_nacido_codigo",this.model.animal_codigo, "parto")
    const modal = await this.modalCtrl.create({
      component: SearchAnimalCodigoPage,
      componentProps: {
        animal_cria: this.model.animal_codigo,
      },
      cssClass: 'searchmodal',
      backdropDismiss: false
    });
    modal.onWillDismiss().then(dataReturned => {
      this.cria = dataReturned.data;
      if(dataReturned.data !== null){
        this.cria = dataReturned.data;
      }else{
        this.cria =this.model.animal_codigo
      }
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending: ', this.model.animal_codigo);
    });
  }*/

  async searchNumero(animal_codigo){
    this.arrayAnimal = await  this.dbContext.getDataFromTable(Tables.Animal);
    if(this.arrayAnimal.length > 0){
      this.filterCodigo = true
      console.log(animal_codigo)
      console.log(this.arrayAnimal)
      this.arrayResult = this.arrayAnimal.filter(element=> String(element.animal_codigo).startsWith(`${animal_codigo}`))
      console.log(this.arrayResult)
    }
    this.animal_codigo = false
  }
  async searchPeso(peso){
    this.arrayLactancia = await  this.dbContext.getDataFromTable(Tables.Lactancia);
    if(this.arrayLactancia.length > 0){
      this.filterPeso = true
      console.log(peso)
      console.log(this.arrayLactancia)
      this.arrayResult1 = this.arrayLactancia.filter(element=> String(element.peso).startsWith(`${peso}`))
      console.log(this.arrayResult1)
    }
    this.peso = false
  }

  async searchLeche(leche){
    this.arrayLactancia = await  this.dbContext.getDataFromTable(Tables.Lactancia);
    if(this.arrayLactancia.length > 0){
      this.filterLeche = true
      console.log(leche)
      console.log(this.arrayLactancia)
      this.arrayResult2 = this.arrayLactancia.filter(element=> String(element.leche).startsWith(`${leche}`))
      console.log(this.arrayResult2)
    }
    this.leche = false
  }
  async searchConcentrado(concentrado){
    this.arrayLactancia = await  this.dbContext.getDataFromTable(Tables.Lactancia);
    if(this.arrayLactancia.length > 0){
      this.filterConcentrado = true
      console.log(concentrado)
      console.log(this.arrayLactancia)
      this.arrayResult3 = this.arrayLactancia.filter(element=> String(element.concentrado).startsWith(`${concentrado}`))
      console.log(this.arrayResult3)
    }
    this.concentrado = false
  }
  addCodigo(animal_codigo){
      this.model.animal_codigo = animal_codigo
      this.filterCodigo = false
      this.arrayResult = []
  }

  addLeche(leche){
    this.model.leche = leche
    this.filterLeche = false
    this.arrayResult2 = []
  }

  addConcentrado(concentrado){
    this.model.concentrado = concentrado
    this.filterConcentrado = false
    this.arrayResult3 = []
  }

  addPeso(peso){
    this.model.peso = peso
    this.filterPeso = false
    this.arrayResult1 = []
  }


  cantDias(fecha){
    var fecha1 = fecha;
    let fechanow =moment().format('DD/MM/YYYY')
    var fecha2 = moment(fechanow);
    this.cantDia = fecha2.diff(fecha1, 'days')
    return this.dia = true

  }

  async saveData(){
    console.log(this.model)
    this.data.fecha = moment(this.model.fecha).format('DD-MM-YYYY HH:mm:ss')
    this.model.fecha = moment(this.model.fecha).format('DD-MM-YYYY')
    await this.dbContext.insertDataInto(Tables.Lactancia, this.model);
    this.data.code = Math.floor(Math.random()*1000)+1
    this.data.leche = this.model.leche
    this.data.concentrado = this.model.concentrado
    this.data.peso = this.model.peso
    this.data.animal_id = this.model.animal_codigo
    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
    this.sincronizacion.nombre = 'lactancias'
                  this.sincronizacion.data = JSON.stringify(this.data)
                  this.sincronizacion.accion = 'INSERT'
                await  this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
    this.model ={
      code:null,
      fecha:moment().format('DD/MM/YYYY'),
      leche: null,
      concentrado: null,
      peso: null,
      animal_codigo: null
    };
    this.data ={
      code:null,
      fecha:moment().format('DD/MM/YYYY'),
      leche: null,
      concentrado: null,
      peso: null,
      animal_id: null,
      negocio_id:null
    };
  }

  async loadData(){
    this.arrayAnimal = await  this.dbContext.getDataFromTable(Tables.Animal);
  }


}
