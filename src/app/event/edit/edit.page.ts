import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { Tables } from 'src/app/models/enums';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  showCode = false;

  datePickerObj: any = {};
  selectedDate: any = moment().format('DD/MM/YYYY');

  model ={
    codigo:null,
    fecha:null,
    animal_codigo: null,
    tipo_evento: null,
  };
  data ={
    fecha:null,
    animal_id: null,
    tipo_evento: null,
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
  mode = 'Editar'
  
  animal_codigo:any

  completed = false
  requiredFinca = true

  

  id:any
  update = false
  arrayTipo_Evento:any
  arrayAnimal:any[] = []
  arrayResult:any[] = []
  filter = false
  constructor(public modalCtrl: ModalController,private route: ActivatedRoute,private router: Router,private alertCtrl: AlertController,private dbContext: DbcontextService,public navCtrl: NavController,private insomnia: Insomnia) { }

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
  }

  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
    this.model.codigo = JSON.parse(localStorage.getItem("evento-codigo"))
    this.model.fecha = JSON.parse(localStorage.getItem("evento-fecha"))
    this.model.fecha = moment(this.model.fecha, 'DD-MM-YYYY').toISOString()
    this.model.animal_codigo = JSON.parse(localStorage.getItem("evento-animal_codigo"))
    this.model.tipo_evento = JSON.parse(localStorage.getItem("evento-tipo_evento"))
    console.log(this.model.fecha)
  }

  selectFinca($event){
    this.model.tipo_evento = $event
    this.requiredFinca = false
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
            this.navCtrl.navigateForward('/evento-home/edit')
            //this.modalCtrl.dismiss();
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.delete(this.model.codigo)
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

  onChangeSex(event){
    console.log(event)
    this.showCode = event.detail.value === '1';
  }

  async saveData(){
    console.log(this.model)
    this.data.fecha = moment(this.model.fecha).format('DD-MM-YYYY HH:mm:ss')
    this.model.fecha = moment(this.model.fecha).format('DD-MM-YYYY')
    await this.dbContext.updateDataInto(Tables.Eventos, this.model,this.model.codigo);
    this.data.animal_id = this.model.animal_codigo
    this.data.tipo_evento = this.model.tipo_evento
    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
    this.sincronizacion.nombre = 'eventos'
            this.sincronizacion.data = JSON.stringify(this.data) 
            this.sincronizacion.accion = 'UPDATE'
            this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
            this.model ={
              codigo:null,
              fecha:moment().format('DD/MM/YYYY'),
              animal_codigo: null,
              tipo_evento: null,
            };
            this.data ={
            fecha:null,
            animal_id: null,
            tipo_evento: null,
            negocio_id:null
            };
    //this.navCtrl.navigateForward('/evento-home')
    this.router.navigateByUrl('/evento-home');
  }


}
