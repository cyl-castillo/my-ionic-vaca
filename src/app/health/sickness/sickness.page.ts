import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {ModalController} from '@ionic/angular';
import {Ionic4DatepickerModalComponent} from '@logisticinfotech/ionic4-datepicker';
import {DbcontextService} from '../../services/dbcontext.service';
import {Tables} from '../../models/enums';
import { SearchAnimalCodigoPage } from 'src/app/search-animal-codigo/search-animal-codigo.page';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-sickness',
  templateUrl: './sickness.page.html',
  styleUrls: ['./sickness.page.scss'],
})
export class SicknessPage implements OnInit {

  datePickerObj: any = {};
  model ={
    fecha:null,
    enfermedadId: null,
    animal_codigo: null
  };
  data ={
    code:null,
    fecha:null,
    fecha_enfermedad:null,
    id_enfermedad: null,
    id_animal: null,
    negocio_id:null
  };
  sincronizacion ={
    nombre:null,
    codigo_remoto:null,
    fecha:null,
    id_usuario:null,
    data:null,
    accion:null
  };
  animal_codigo = true
  arrayEnfermedad:Array<any> = [];
  arrayAnimal:any[] = []
  arrayResult:any[] = []
  filter = false
  requiredFinca = true
  constructor(public modalCtrl: ModalController, private dbContext: DbcontextService,private insomnia: Insomnia
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
    this.model.enfermedadId = $event
  }

  async loadData(){
    this.arrayEnfermedad = await  this.dbContext.getDataFromTable(Tables.Enfermedad);
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
    this.data.fecha_enfermedad = moment(this.model.fecha).format('DD-MM-YYYY HH:mm:ss')
    this.model.fecha = moment(this.model.fecha).format('DD-MM-YYYY')
    await this.dbContext.insertDataInto(Tables.Enfermedades, this.model);
    this.data.code = Math.floor(Math.random()*1000)+1
    this.data.id_enfermedad = this.model.enfermedadId
    this.data.id_animal = this.model.animal_codigo
    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
      this.sincronizacion.nombre = 'registros_enfermedades'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'INSERT'
                  await  this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
    
    this.model ={
      fecha:moment().format('DD/MM/YYYY'),
      enfermedadId: null,
      animal_codigo: null
    };
    this.data ={
      code:null,
    fecha:null,
    fecha_enfermedad:null,
    id_enfermedad: null,
    id_animal: null,
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
