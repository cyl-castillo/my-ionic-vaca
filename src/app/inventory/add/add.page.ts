import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import {ModalController, NavController, NavParams} from '@ionic/angular';
import {Ionic4DatepickerModalComponent} from '@logisticinfotech/ionic4-datepicker';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { Tables } from 'src/app/models/enums';
import { SearchAnimalCodigoPage } from 'src/app/search-animal-codigo/search-animal-codigo.page';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { element } from 'protractor';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  showCode = false;
  showCode1 = false;
  showCode2 = false;

  datePickerObj: any = {};
  selectedDate: any = moment().format('DD/MM/YYYY');
  codigo:any


  //animal_codigo:any

  mode = 'Agregar'
  animal ={
    code:null,
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
  
  data ={
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
    fecha:null,
    id_usuario:null,
    data:null,
    accion:null
  };
  temp:boolean

  madreId = true
  padreId = true
  animal_codigo = true

  
  update = false
  arrayLote:any[] = []
  arrayFinca:any[] = []
  arrayRaza:any[] = []
  arrayAnimal:any[] = []
  arrayAnimalFilter:any[] = []
  arrayResult:any[] = []
  filter = false
  unicoanimal_codigo = false;
  requiredFinca = true
  requiredFinca1 = true
  arrayResult1: any[] = [];
  arrayResult2: any[] = [];
  constructor(
    public modalCtrl: ModalController,
    private dbContext: DbcontextService,
    public navCtrl: NavController,
    private insomnia: Insomnia
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
    this.loadData()
  }

  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
  }

  updateTemp(){
    this.animal.temp = this.temp
    console.log(this.animal.temp)
  }

  selectFinca(){
    this.requiredFinca = false
  }

  selectFinca1(){
    this.requiredFinca1 = false
  }

  async loadData(){
    this.arrayFinca = await  this.dbContext.getDataFromTable(Tables.Finca);
    this.arrayLote = await  this.dbContext.getDataFromTable(Tables.Lote);
    this.arrayRaza = await  this.dbContext.getDataFromTable(Tables.Raza);
  }

  async searchData(){
    this.arrayAnimal = await  this.dbContext.getDataFromTable(Tables.Animal);
    this.arrayAnimal.forEach(element=>{
       if(element.animal_codigo == this.animal.animal_codigo){
        this.unicoanimal_codigo = true
       }else{
        this.unicoanimal_codigo = false
       }
    })
    this.arrayAnimalFilter = this.arrayAnimal.filter(res=>{
      return res.animal_codigo == this.animal.animal_codigo
    })
    this.animal_codigo = false
    /*let pos = this.arrayAnimal.map((e)=>{
      return e.animal_codigo
    }).indexOf(animal_codigo)
    if(pos >-1){
      this.unicoanimal_codigo = true
      console.log( this.unicoanimal_codigo)
      return this.unicoanimal_codigo
    }else {
      this.unicoanimal_codigo = false
      console.log( this.unicoanimal_codigo)
      return this.unicoanimal_codigo
    } */
  }
  addCodigo(codigo){
      this.animal.animal_codigo = codigo
      this.filter = false
      this.arrayResult = []
  }


  async searchDataM(animal_codigo){
    this.arrayAnimal = await  this.dbContext.getDataFromTable(Tables.Animal);
    this.madreId = false
    if(this.arrayAnimal.length > 0){
      this.filter = true
      console.log(animal_codigo)
      console.log(this.arrayAnimal)
      this.arrayResult1 = this.arrayAnimal.filter(element=> String(element.animal_codigo).startsWith(`${animal_codigo}`))
       console.log(this.arrayResult1)
    }
  }
  addCodigo1(codigo){
      this.animal.madreId = codigo
      this.filter = false
      this.arrayResult1 = []
  }


  async searchDataP(animal_codigo){
    this.arrayAnimal = await  this.dbContext.getDataFromTable(Tables.Animal);
    this.padreId = false
    if(this.arrayAnimal.length > 0){
      this.filter = true
      console.log(animal_codigo)
      console.log(this.arrayAnimal)
      this.arrayResult2 = this.arrayAnimal.filter(element=> String(element.animal_codigo).startsWith(`${animal_codigo}`))
       console.log(this.arrayResult2)
    }
  }
  addCodigo2(codigo){
      this.animal.padreId = codigo
      this.filter = false
      this.arrayResult2 = []
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
            this.animal.fecha = data.data.date;
          }
        });
  }

  onChangeSex(event){
    console.log(event)
    this.showCode = event.detail.value === '1';
  }



  async saveData(){
    if(this.arrayAnimalFilter.length == 0){
      console.log(this.animal)
      this.data.fecha_nacimiento = moment(this.animal.fecha).format('DD-MM-YYYY HH:mm:ss')
      this.animal.fecha = moment(this.animal.fecha).format('DD-MM-YYYY')  
      await this.dbContext.insertDataInto(Tables.Animal, this.animal)
      this.data.code = this.animal.animal_codigo
      this.data.sexo =  this.animal.sexo
      this.data.lote_nacimiento_id = this.animal.lote_nacimientoId
      this.data.lote_actual_id = this.animal.lote_actual_Id
      this.data.raza_codigo = this.animal.razaId
      this.data.madre_codigo = this.animal.madreId
      this.data.padre_codigo = this.animal.padreId
      this.data.temporal_id = this.animal.idTemporal
      this.data.inventario_id = this.animal.idInventario
      this.data.temporal = this.animal.temp
      this.data.estado_id = this.animal.ultimo_estado
      this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
      this.sincronizacion.nombre = 'animales'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'INSERT'
                  await  this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
     
      this.animal ={
        code:null,
        animal_codigo: null,
        fecha:moment().format('DD/MM/YYYY'),
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
      this.data ={
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
    this.modalCtrl.dismiss();

    }else{
      alert('Número del animal ya existe')
    }
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

}
