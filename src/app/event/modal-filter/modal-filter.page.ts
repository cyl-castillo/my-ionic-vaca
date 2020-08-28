import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { Tables } from 'src/app/models/enums';

@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.page.html',
  styleUrls: ['./modal-filter.page.scss'],
})
export class ModalFilterPage implements OnInit {

  @Input() public lunch: string;
  
  datePickerObj: any = {};
  selectedDate: any = moment().format('DD/MM/YYYY');

  @Input()public data ={
    fecha:null,
    animal_codigo: null,
    tipo_evento: null,
   // cumplido:null
  };
  arrayResult:any[] = []
  arrayEvento:any[] = []
  filter = false
  arrayTipo_Evento:any

  constructor(private modalController: ModalController,private dbContext: DbcontextService) { }

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
    this.loadData()
  }

  async loadData(){
    this.arrayTipo_Evento = await  this.dbContext.getDataFromTable(Tables.Tipo_Evento);
    
  }

  async openDatePicker() {
    const datePickerModal = await this.modalController.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: {
        objConfig: this.datePickerObj,
        selectedDate: this.selectedDate
      }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss()
        .then((data) => {
          console.log(data);
          if (moment(data.data.date).isValid()) {
            this.selectedDate = data.data.date;
          }
        });
  }


  async closeModal() {
    await this.modalController.dismiss();
  }


  limpiar(){
    this.data.fecha = moment().format('DD/MM/YYYY')
    this.data.animal_codigo = null
    this.data.tipo_evento = null
    //this.data.cumplido = null
  }

  async buscar(){
    //this.data.fecha = this.selectedDate
    this.data.fecha = moment(this.data.fecha).format('DD-MM-YYYY')
    //this.arrayResult = await this.dbContext.filterEvento(this.data)
    //await this.modalController.dismiss(this.arrayResult);
    

    this.arrayEvento = await  this.dbContext.getDataFromTable(Tables.Eventos);
    if(this.arrayEvento.length > 0){
      this.filter = true
      console.log(this.arrayEvento)
      /*this.arrayAnimal.forEach(element=>{
        if(String(element.animal_codigo).startsWith(`${this.data.animal_codigo}`) || element.fecha == this.data.fecha || element.tipo_evento == this.data.tipo_evento){
            this.arrayResult1 = element
        }
      })*/
      this.arrayResult = await this.dbContext.filterEvento(this.data)
      console.log(this.arrayResult)
      await this.modalController.dismiss(this.arrayResult);
    }
  }


  async searchData(animal_codigo){
    this.arrayEvento = await  this.dbContext.getDataFromTable(Tables.Eventos);
    if(this.arrayEvento.length > 0){
      this.filter = true
      console.log(animal_codigo)
      console.log(this.arrayEvento)
      this.arrayResult = this.arrayEvento.filter(element=> String(element.animal_codigo).startsWith(`${animal_codigo}`))
      console.log(this.arrayResult)
    }
  }
  addCodigo(codigo){
      this.data.animal_codigo = codigo
      this.filter = false
      this.arrayResult = []
  }

}
