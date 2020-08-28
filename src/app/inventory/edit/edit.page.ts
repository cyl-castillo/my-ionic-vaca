import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Tables } from 'src/app/models/enums';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { ModalController, NavController, NavParams, AlertController } from '@ionic/angular';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { SearchAnimalCodigoPage } from 'src/app/search-animal-codigo/search-animal-codigo.page';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { element } from 'protractor';

/*export interface Inventario {
  codigo: number
  animal_codigo: number,
    fecha:string
    sexo:string,
    lote_nacimientoId:number,
    lote: number,
    raza:number,
    madreId:number,
    padreId:null,
    idTemporal:number,
    idInventario:number,
}*/
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  showCode = false;
  showCode1 = false;
  showCode2 = false;

  datePickerObj: any = {};
  selectedDate: any = moment().format('DD/MM/YYYY');
  arrayLote:any[] = []
  arrayFinca:any[] = []
  arrayRaza:any[] = []
  razaSelect:any
  //arrayRaza:any[] = [{codigo:1,nombre:"vaca"},{codigo:2,nombre:"toro"}]
  animal_codigo:any

  @Input()animal ={
    codigo: null,
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

  codigo:any
  arrayAnimal:any[] = []
  arrayResult:any[] = []
  filter = false

  compareWith : any ;
  requiredFinca = true
  requiredFinca1 = true
  razanombre: any;
  lotenombre: any;
  fecha:any
  raza = false

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

  //@Input() inventario : Inventario
  constructor( public modalCtrl: ModalController,
    private dbContext: DbcontextService,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private insomnia: Insomnia,
    private navParams: NavParams) { }

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
    /*if(this.inventario.codigo !== null){
      this.animal.codigo = this.inventario.codigo
      this.animal.animal_codigo = this.inventario.animal_codigo
      this.animal.fecha = this.inventario.fecha
      this.animal.idInventario = this.inventario.idInventario
      this.animal.idTemporal = this.inventario.idTemporal
      this.animal.raza = this.inventario.raza
      this.animal.lote = this.inventario.lote
      this.animal.lote_nacimientoId = this.inventario.lote_nacimientoId
      this.animal.madreId = this.inventario.madreId
      this.animal.padreId = this.inventario.padreId
      this.animal.sexo = this.inventario.sexo
    }*/
  }

  selectFinca(){
    this.requiredFinca = false
  }

  selectFinca1(){
    this.requiredFinca1 = false
  }

  updateTemp(){
    this.animal.temp = this.temp
    console.log(this.animal.temp)
  }

  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
    this.loadData()
    this.animal = this.navParams.get('inventario')
    this.animal.fecha = moment(this.animal.fecha, 'DD-MM-YYYY').toISOString()
    if(this.animal.padreId == null){
      this.arrayAnimal.forEach(element=>{
        if(element.sexo == 2){
          this.animal.padreId = element.codigo
        }
      })
    }
    /*this.arrayRaza.forEach(element=>{
      if(element.idLote == this.animal.lote_actual_Id){
        this.lotenombre = element.nombre
        console.log(this.razanombre)
      }
    })*/
    this.temp = this.animal.temp
    console.log(this.animal.fecha)
   
    /*let pos = this.arrayRaza.map((e)=>{
      return e.codigo
    }).indexOf(this.animal.razaId)
    if(pos >-1){
      this.animal.razaId = this.arrayRaza[pos].codigo
    }
    this.animal.razaId =  JSON.parse(localStorage.getItem("raza-animal"))*/
    this.compareWith = this.compareWithFn;
  }

  compareWithFn(o1, o2) {
    return o1 === o2;
  };

  async razaNombre(){
    this.arrayRaza = await  this.dbContext.getDataFromTable(Tables.Raza); 
    this.arrayRaza.forEach(element=>{
      if(element.codigo == this.animal.razaId){
        return  this.razanombre = element.nombre
      }
    })
  }

  async loadData(){
    this.arrayFinca = await  this.dbContext.getDataFromTable(Tables.Finca);
    this.arrayLote = await  this.dbContext.getDataFromTable(Tables.Lote);
    if(this.arrayRaza.length == 0){
      this.arrayRaza = await  this.dbContext.getDataFromTable(Tables.Raza);
      this.arrayRaza.forEach(element=>{
        if(element.codigo == this.animal.razaId){
           this.razanombre = element.nombre
        }
      }) 
    }
    
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
        this.animal.animal_codigo = dataReturned.data.animal_codigo;
      }else{
        this.animal.animal_codigo = animal_codigo
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
      this.arrayResult = this.arrayAnimal.filter(element=> String(element.codigo).startsWith(`${animal_codigo}`))
      console.log(this.arrayResult)
    }
  }
  addCodigo(codigo){
      this.animal.animal_codigo = codigo
      this.filter = false
      this.arrayResult = []
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

  onChangeRaz(event){
    this.razanombre = ''
    console.log(event.detail.value)
  }

  onChangeFin(event){
    console.log(event.detail.value)
  }

  onChangeLot(event){
    console.log(event.detail.value)
  }


  async saveData(){
    console.log(this.animal)
    this.data.fecha_nacimiento = moment(this.animal.fecha).format('DD-MM-YYYY HH:mm:ss')
    this.animal.fecha = moment(this.animal.fecha).format('DD-MM-YYYY')
        await this.dbContext.updateDataInto(Tables.Animal, this.animal,this.animal.codigo)
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
                    this.sincronizacion.accion = 'UPDATE'
                  await  this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
     
        this.animal ={
          codigo: null,
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
    //this.navCtrl.navigateForward('/inventory')
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }


  async presentAlertConfirm(item) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar!',
      message: ' <strong>¿Seguro que desea eliminar?</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.delete()
          }
        }
      ]
    });

    await alert.present();
  }


  async updateAnimal_Codigo() {
    const alert = await this.alertCtrl.create({
      header: 'Actualizar Número del Animal!',
      message: '',
      inputs: [ 
        { 
        name: 'animal_codigo', 
        type: 'text', 
        placeholder: 'Número del animal',
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Aceptar',
          handler: data => {
            this.animal.animal_codigo = data.animal_codigo
            this.actualizarcodigo(this.animal.animal_codigo,data.animal_codigo)
          }
        }
      ]
    });

    await alert.present();
  }

  async actualizarcodigo(item_old:any,item_new:any){
      await this.dbContext.animal_codigoUpdate(Tables.Animal,item_old,item_new)
      await this.dbContext.animal_codigoUpdate1(Tables.Ventas,item_old,item_new)
      await this.dbContext.animal_codigoUpdate2(Tables.Muertes,item_old,item_new)
      await this.dbContext.animal_codigoUpdate3(Tables.Enfermedades,item_old,item_new)
      await this.dbContext.animal_codigoUpdate4(Tables.Mediciones_Fisicas,item_old,item_new)
      await this.dbContext.animal_codigoUpdate5(Tables.Produccion,item_old,item_new)
      await this.dbContext.animal_codigoUpdate6(Tables.Ingreso_Finca,item_old,item_new)
      await this.dbContext.animal_codigoUpdate7(Tables.Parto,item_old,item_new)
      await this.dbContext.animal_codigoUpdate8(Tables.Servicios,item_old,item_new)
      await this.dbContext.animal_codigoUpdate9(Tables.Lactancia,item_old,item_new)
      await this.dbContext.animal_codigoUpdate10(Tables.Eventos,item_old,item_new)
      await this.dbContext.animal_codigoUpdate11(Tables.Celos,item_old,item_new)
      await this.dbContext.animal_codigoUpdate12(Tables.Palpacion,item_old,item_new)
      await this.dbContext.animal_codigoUpdate13(Tables.Leche,item_old,item_new)
      await this.dbContext.animal_codigoUpdate14(Tables.Tratamiento,item_old,item_new)
  }

  async delete(){
    await this.dbContext.deleteFromTable(Tables.Animal,this.animal.codigo)
    await this.modalCtrl.dismiss();
  }

}
