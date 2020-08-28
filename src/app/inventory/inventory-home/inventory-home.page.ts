import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, LoadingController, AlertController} from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {ModalFilterPage} from '../modal-filter/modal-filter.page';
import { AddPage } from '../add/add.page';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { Tables } from 'src/app/models/enums';
import * as moment from 'moment';
import { element } from 'protractor';
import { EditPage } from '../edit/edit.page';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-inventory-home',
  templateUrl: './inventory-home.page.html',
  styleUrls: ['./inventory-home.page.scss'],
})
export class InventoryHomePage implements OnInit {

  // @ts-ignore
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public lunch = {
    mainCourse: 'steak',
    desert: 'pudding'
  };

  model ={
    codigo:null,
    animal_codigo: null,
    raza:null,
    sexo:null,
    semen:null,
    finca:null,
    lote: null,
    fecha:null,
  };
  public dinner: string;
  arrayInventory:any[] = []
  arrayInventory1:any[] = []
  /*arrayInventory:any[] =[{
    codigo: 11,
    animal_codigo: 11,
    fecha:moment().format('DD-MMM'),
    sexo:1,
    lote_nacimientoId:null,
    lote_actual_Id: null,
    razaId:1,
    madreId:1,
    padreId:1,
    idTemporal:null,
    idInventario:null,
  },{
    codigo: 12,
    animal_codigo: 12,
    fecha:'22-06-2020',
    sexo:2,
    lote_nacimientoId:null,
    lote_actual_Id: null,
    razaId:2,
    madreId:111,
    padreId:234,
    idTemporal:null,
    idInventario:null,
  }]*/
  textSearch = '';

  fincanombre:any
  sexonombre:any
  razanombre:any
  arrayFarm:any[] = []
  arraySexo:any[] = []
  arrayRaza:any[] = []
  genero:any
  fecha: string;
  constructor(private modalController: ModalController, private insomnia: Insomnia,private dbContext: DbcontextService,public loadingCtrl: LoadingController) {}

  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
    this.load(); 
  }

  

  
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // tslint:disable-next-line:triple-equals
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalFilterPage,
      backdropDismiss: false,
    });
    modal.onWillDismiss().then(result=>{
      this.arrayInventory = result.data as any[]
    })
    return await modal.present();
  }
  async openModalWithData(model) {
    localStorage.setItem("raza-animal",model.razaId)
    const modal = await this.modalController.create({
      component: EditPage,
      componentProps: {
        inventario: model
      },
      backdropDismiss: false
    });
    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      this.dinner = dataReturned.data;
      this.load()
      console.log('Receive: ', this.dinner);
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending: ', this.lunch);
    });
  }

  ngOnInit() {
    //this.load()
  }


  async load(){
    this.presentLoading();
    this.arrayInventory = await this.dbContext.getDataFromTable(Tables.Animal)
    this.arrayInventory1 = this.arrayInventory
    this.arrayRaza = await this.dbContext.getDataFromTable(Tables.Raza)

    this.arrayFarm = await this.dbContext.getDataFromTable(Tables.Finca)
  }
  

  search(textSearch){
       this.arrayInventory = this.arrayInventory1.filter(element=> String(element.animal_codigo).startsWith(`${textSearch}`))
  }

  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      //message: 'Loading...',
      spinner: 'bubbles',
      duration: 2000
    });
    return await loading.present();
  }


  raza(id){
    this.arrayRaza.forEach(element=>{
      if(element.codigo == id){
         this.razanombre = element.nombre
      }
    })
    return this.razanombre
  }
  fechaFormat(fecha){
    return this.fecha = moment(fecha, 'DD-MM-YYYY').format('YYYY');
  }

  sexo(sexo){

     if(sexo == 'Hembra'){
      this.sexonombre = 'H'
      this.genero = 'female'

    }else if(sexo == 'Macho'){
      this.sexonombre = 'M'
      this.genero = 'male'
    }
    return this.sexonombre

  }

  finca(id){

    this.arrayFarm.forEach(element=>{
      if(element.idfinca == id){
         this.fincanombre = element.nombre
      }
    })
    return this.fincanombre
  }

  


}
