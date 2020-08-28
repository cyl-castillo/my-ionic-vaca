import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, NavController, NavParams } from '@ionic/angular';
import { DbcontextService } from '../services/dbcontext.service';
import * as moment from 'moment';
import { Tables } from '../models/enums';
import { element } from 'protractor';

@Component({
  selector: 'app-modal-event',
  templateUrl: './modal-event.page.html',
  styleUrls: ['./modal-event.page.scss'],
})
export class ModalEventPage implements OnInit {


  @Input() public header: string;
  @Input() public message: string;
  @Input() eventos ={
    fecha:null,
    animal_codigo: null,
    tipo_evento: null,
    animal_inseminador: null,
    codigo_semen:null

  };
  data ={
    fecha:null,
    animal_id: null,
    tipo_evento: null,
    negocio_id:null
  };
  dias:any
  //tipo_evento:any
  servicio:any
  servicios:any

  diaEvento = {
    codigo:null,
    nombre:null,
    dia:null
  }
  sincronizacion ={
    nombre:null,
    codigo_remoto:null,
    fecha:null,
    id_usuario:null,
    data:null,
    accion:null
  };
  
  arrayRango:any[] = []
  arrayDiaEvento:any[] = []
  editar = false
  requiredFinca1 = false;
  isSelectedService = false;
  isArtificial = false
  arrayAnimal: any[] = [];
  filter2 = false;
  arrayResult2: any[] = [];
  animal_inseminador: boolean;
  arrayServicio:any[] = []
  constructor(public modalCtrl: ModalController,  private navParams: NavParams, private dbContext: DbcontextService, private alertCtrl: AlertController, public navCtrl: NavController) { }

  ngOnInit() {

    
    this.header = this.navParams.get('header')
    this.message = this.navParams.get('message')
    this.eventos = this.navParams.get('eventos')
    this.loadDiaEvento()   
  }

  async loadDiaEvento(){
     this.arrayDiaEvento = await this.dbContext.getDataFromTable(Tables.Dia_Evento)
     this.arrayServicio = await this.dbContext.getDataFromTable(Tables.Servicios)
     /*this.arrayDiaEvento.find(element=>{
        if(element.nombre === 'celo'){
             this.dias = element.dia
        }else
        if(element.nombre === 'parto'){
          this.dias = element.dia
        }else
        if(element.nombre === 'palpacion'){
          this.dias = element.dia
        }else
        if(element.nombre === 'servicio'){
          this.dias = element.dia
        } 
     })*/
     this.arrayServicio.forEach(element=>{
        //if(element.animal_inseminado_codigo == this.eventos.animal_codigo){
          this.eventos.animal_inseminador = element.animal_inseminador_codigo
          this.eventos.codigo_semen = element.semen_codigo
        //}
     })
     this.arrayDiaEvento = this.arrayDiaEvento.filter(element => element.nombre === this.eventos.tipo_evento)
     this.arrayDiaEvento.forEach(element=>{
       this.dias = element.dia
     })
     /*this.dias = this.arrayDiaEvento.filter(element=>{
      if(element.nombre === 'celo'){
        return element.dia
      }else
      if(element.nombre === 'parto'){
        return element.dia
      }else
      if(element.nombre === 'palpacion'){
        return element.dia
      }else
      if(element.nombre === 'servicio'){
        return element.dia
      } 
     })*/
      if(this.eventos.tipo_evento === 'servicio'){
        this.dias = localStorage.getItem("servicio")
        this.servicios = true
      }
     /*if(this.eventos.tipo_evento === 'celo'){
      this.dias = localStorage.getItem("celo")
    }
    if(this.eventos.tipo_evento === 'parto'){
      this.dias = localStorage.getItem("parto")
    }
    if(this.eventos.tipo_evento === 'palpacion'){
      this.dias = localStorage.getItem("palpacion")
    }
    if(this.eventos.tipo_evento === 'servicio'){
      this.dias = localStorage.getItem("servicio")
      this.servicios = true
    } */
  }

  async evento(){
    this.data.fecha = moment(this.eventos.fecha).format('DD-MM-YYYY HH:mm:ss')
    this.eventos.fecha = moment(this.eventos.fecha).add(parseInt(this.dias), 'd').format('DD-MM-YYYY');
    //this.eventos.fecha = moment(this.eventos.fecha).format('DD-MM-YYYY')
     await this.dbContext.insertDataInto(Tables.Eventos, this.eventos);
     this.data.animal_id = this.eventos.animal_codigo
      this.data.tipo_evento = this.eventos.tipo_evento
      this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
      this.sincronizacion.nombre = 'eventos'
              this.sincronizacion.data = JSON.stringify(this.data) 
              this.sincronizacion.accion = 'INSERT'
              this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
              this.data ={
                fecha:null,
                animal_id: null,
                tipo_evento: null,
                negocio_id:null
                };
     await this.modalCtrl.dismiss();
  }

  onChangeService(event) {
    console.log(event);
    if (event.detail.value === '1') {
      this.isArtificial = true;
      this.eventos.animal_inseminador = null;
    } else {
      this.isArtificial = false;
      this.eventos.codigo_semen = null;
    }
    this.isSelectedService = true;
    this.requiredFinca1 = false
  }

  async searchDataT(animal_codigo){
    this.arrayAnimal = await  this.dbContext.getDataFromTable(Tables.Animal);
    if(this.arrayAnimal.length > 0){
      this.filter2 = true
      console.log(animal_codigo)
      console.log(this.arrayAnimal)
      this.arrayResult2 = this.arrayAnimal.filter(element=> String(element.animal_codigo).startsWith(`${animal_codigo}`))
      console.log(this.arrayResult2)
    }
    this.animal_inseminador = false
  }
  addCodigo2(codigo){
      this.eventos.animal_inseminador = codigo
      this.filter2 = false
      this.arrayResult2 = []
  }

  dia(){
    this.editar = true
  }

  async validar(){
    this.arrayRango = await this.dbContext.getRango(Tables.Rango,this.dias)
    if(this.arrayRango.length == 0){
      alert("El día ingresado no se encuentra en el rango de eventos")
    }
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  onChangeSex($event){
    console.log($event)
  }

}
