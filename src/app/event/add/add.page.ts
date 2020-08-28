import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { ModalController, NavController, AlertController, NavParams } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { Tables } from 'src/app/models/enums';
import { SearchAnimalCodigoPage } from 'src/app/search-animal-codigo/search-animal-codigo.page';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  showCode = false;

  datePickerObj: any = {};
  selectedDate: any = moment().format('DD/MM/YYYY');

  @Input() model ={
    code:null,
    fecha:null,
    animal_codigo: null,
    tipo_evento: null,
    active:null
  };
  data ={
    fecha:null,
    animal_id: null,
    tipo_evento: null,
    negocio_id:null
  };
  mode = 'Agregar'
  
  animal_codigo = true

  completed = false

  

  id:any
  update = false
  arrayTipo_Evento:any
  arrayAnimal:any[] = []
  arrayResult:any[] = []
  filter = false
  requiredFinca = true

  sincronizacion ={
    nombre:null,
    codigo_remoto:null,
    fecha:null,
    id_usuario:null,
    data:null,
    accion:null,
    active:true
  };
  constructor(public modalCtrl: ModalController,/*private navParams: NavParams,*/private alertCtrl: AlertController,private dbContext: DbcontextService,public navCtrl: NavController,private insomnia: Insomnia) { }

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
    
    if(this.model.code !== null){
      this.update = true
      this.mode = 'Editar'

    }
  }

  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
  }

  async loadData(){
    this.arrayTipo_Evento = await  this.dbContext.getDataFromTable(Tables.Tipo_Evento);
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

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

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      message: '<strong>¿Seguro que desea borrar este evento?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //this.navCtrl.navigateForward('/evento-home')
            this.modalCtrl.dismiss();
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.delete(this.model.code)
          }
        }
      ]
    });

    await alert.present();
  }

  async delete(codigo){
    this.dbContext.deleteFromTable(Tables.Eventos,codigo)
    await this.modalCtrl.dismiss();
  }

  


  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
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
            //this.selectedDate = data.data.date;
            this.model.fecha = data.data.date;
          }
        });
  }

  selectFinca($event){
    this.model.tipo_evento = $event
    this.requiredFinca = false
  }
  onChangeSex(event){
    console.log(event)
    this.showCode = event.detail.value === '1';
  }

  async saveData(){
    console.log(this.model)

    this.data.fecha = moment(this.model.fecha).format('DD-MM-YYYY HH:mm:ss')
    this.model.fecha = moment(this.model.fecha).format('DD-MM-YYYY')
    this.model.active = true
      await this.dbContext.insertDataInto(Tables.Eventos, this.model);
      this.data.animal_id = this.model.animal_codigo
      this.data.tipo_evento = this.model.tipo_evento
      this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
      this.sincronizacion.nombre = 'eventos'
              this.sincronizacion.data = JSON.stringify(this.data) 
              this.sincronizacion.accion = 'INSERT'
              this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
    this.model ={
      code:null,
      fecha:null,
      animal_codigo: null,
      tipo_evento: null,
      active:null
    };
    this.data ={
    fecha:null,
    animal_id: null,
    tipo_evento: null,
    negocio_id:null
    };
  }

}
