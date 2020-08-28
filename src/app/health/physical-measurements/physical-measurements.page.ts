import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {ModalController} from '@ionic/angular';
import {Ionic4DatepickerModalComponent} from '@logisticinfotech/ionic4-datepicker';
import {DbcontextService} from '../../services/dbcontext.service';
import {Tables} from '../../models/enums';
import { SearchAnimalCodigoPage } from 'src/app/search-animal-codigo/search-animal-codigo.page';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-physical-measurements',
  templateUrl: './physical-measurements.page.html',
  styleUrls: ['./physical-measurements.page.scss'],
})
export class PhysicalMeasurementsPage implements OnInit {

  datePickerObj: any = {};
  model ={
    fecha:null,
    condicionId: null,
    locomocionId: null,
    animal_codigo: null
  };
  data ={
    code:null,
    fecha:null,
    condicion_id: null,
    locomocion_id: null,
    animal_id: null,
    negocio_id:null
  };
  sincronizacion ={
    nombre:null,
    codigo_remoto:null,
    fecha:moment().format('DD/MM/YYYY'),
    id_usuario:null,
    data:null,
    accion:null
  };
  animal_codigo = true
  arraycondicion:Array<any> = [];
  arrayLocomocion:Array<any> = [];
  arrayAnimal:any[] = []
  arrayResult:any[] = []
  filter = false
  requiredFinca = true
  requiredFinca1 = true

  constructor(
      public modalCtrl: ModalController,private dbContext: DbcontextService,private insomnia: Insomnia
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
  }

  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
  }

  selectFinca($event){
    this.requiredFinca = false
    this.model.condicionId = $event
  }

  selectFinca1($event){
    this.requiredFinca1 = false
    this.model.locomocionId = $event
  }

  async loadData(){
    this.arraycondicion = await  this.dbContext.getDataFromTable(Tables.Condicion_Corporal);
    this.arrayLocomocion = await  this.dbContext.getDataFromTable(Tables.Locomocion);
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
    await this.dbContext.insertDataInto(Tables.Mediciones_Fisicas, this.model);
    this.data.code = Math.floor(Math.random()*1000)+1
    this.data.condicion_id = this.model.condicionId
    this.data.locomocion_id = this.model.locomocionId
    this.data.animal_id = this.model.animal_codigo
    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
      this.sincronizacion.nombre = 'mediciones_fisicas'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'INSERT'
                  await  this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
    this.model ={
      fecha:moment().format('DD/MM/YYYY'),
      condicionId: null,
      locomocionId: null,
      animal_codigo: null
    };
    this.data ={
      code:null,
      fecha:null,
      condicion_id: null,
      locomocion_id: null,
      animal_id: null,
      negocio_id:null
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
      this.arrayResult = this.arrayAnimal.filter(element=> String(element.animal_codigo).startsWith(`${animal_codigo}`))
      console.log(this.arrayResult)
    }
    this.animal_codigo = false
  }
  addCodigo(codigo){
      this.model.animal_codigo = codigo
      this.filter = false
      this.arrayResult = []
  }


}
