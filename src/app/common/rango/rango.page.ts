import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import * as moment from 'moment';
import { Tables } from 'src/app/models/enums';
import { element } from 'protractor';

@Component({
  selector: 'app-rango',
  templateUrl: './rango.page.html',
  styleUrls: ['./rango.page.scss'],
})
export class RangoPage implements OnInit {

  
  celos = {
    id_tipo_evento:null,
    min: null,
    max:null,
  };

  palpacions = {
    id_tipo_evento:null,
    min: null,
    max:null,
  };

  partos = {
    id_tipo_evento:null,
    min: null,
    max:null,
  };

  servicios = {
    id_tipo_evento:null,
    min: null,
    max:null,
  };

  tipo_evento = {
    nombre: ""
  }

  estado = {
    codigo:null,
    nombre:null
  } 
  arrayTipo_Evento:any[] = []
  arrayEstado:any[] = []

  constructor(private modalController: ModalController,private dbContext: DbcontextService) { }

  async ngOnInit() {
    await this.dbContext.getDataFromTable(Tables.Tipo_Evento).then(res=>{
      this.arrayTipo_Evento = res as any[]
    })
  }

  ionViewWillEnter(){
    if(localStorage.getItem("celo-desde") !== undefined){
      this.celos.min = localStorage.getItem("celo-desde")
    }
    if(localStorage.getItem("celo-hasta") !== undefined){
      this.celos.max = localStorage.getItem("celo-hasta")
    }
    if(localStorage.getItem("parto-hasta") !== undefined){
      this.partos.max = localStorage.getItem("parto-hasta")
    }
    if(localStorage.getItem("parto-desde") !== undefined){
      this.partos.min = localStorage.getItem("parto-desde")
    }
    if(localStorage.getItem("Palpacion-hasta") !== undefined){
      this.palpacions.max = localStorage.getItem("Palpacion-hasta")
    }
    if(localStorage.getItem("Palpacion-desde") !== undefined){
      this.palpacions.min = localStorage.getItem("Palpacion-desde")
    }
    if(localStorage.getItem("Servicio-desde") !== undefined){
      this.servicios.min = localStorage.getItem("Servicio-desde")
    }
    if(localStorage.getItem("Servicio-hasta") !== undefined){
      this.servicios.max = localStorage.getItem("Servicio-hasta")
    }
  }
  async closeModal() {
   // this.loadEstado()
    await this.modalController.dismiss();
  }

  async loadEstado(){
    this.arrayEstado = await this.dbContext.getDataFromTable(Tables.Eventos)
    if(this.arrayEstado.length == 0){
      this.estado.codigo  = 1
      this.estado.nombre = 'Celo'
      await this.dbContext.insertDataInto(Tables.Estado, this.estado)
  
      this.estado.codigo  = 2
      this.estado.nombre = 'Serviciada Positivo'
      await this.dbContext.insertDataInto(Tables.Estado, this.estado)
  
      this.estado.codigo  = 3
      this.estado.nombre = 'Serviciada Negativo'
      await this.dbContext.insertDataInto(Tables.Estado, this.estado)
  
      this.estado.codigo  = 4
      this.estado.nombre = 'Palpada Positiva'
      await this.dbContext.insertDataInto(Tables.Estado, this.estado)
  
      this.estado.codigo  = 5
      this.estado.nombre = 'Palpada Negativa'
      await this.dbContext.insertDataInto(Tables.Estado, this.estado)

      this.estado.codigo  = 6
      this.estado.nombre = 'Normal'
      await this.dbContext.insertDataInto(Tables.Estado, this.estado)
    }  
  }

  async celo(){
            this.arrayTipo_Evento.forEach(element=>{
              if(element.nombre === 'Celo'){
                this.celos.id_tipo_evento = element.codigo
              }
            })
            localStorage.setItem('celo-desde',this.celos.min)
            localStorage.setItem('celo-hasta',this.celos.max)
            await this.dbContext.insertDataInto(Tables.Rango, this.celos);
  }

  async parto(){
            this.arrayTipo_Evento.forEach(element=>{
              if(element.nombre === 'Parto'){
                this.partos.id_tipo_evento = element.codigo
              }
            })
            localStorage.setItem('parto-desde',this.partos.min)
            localStorage.setItem('parto-hasta',this.partos.max)
            await this.dbContext.insertDataInto(Tables.Rango, this.partos);
            
  }

  async palpacion(){
            this.arrayTipo_Evento.forEach(element=>{
              if(element.nombre === 'Palpacion'){
                this.palpacions.id_tipo_evento = element.codigo
              }
            })
            localStorage.setItem('Palpacion-desde',this.palpacions.min)
            localStorage.setItem('Palpacion-hasta',this.palpacions.max)
            await this.dbContext.insertDataInto(Tables.Rango, this.palpacions);
            
  }

  async servicio(){
            this.arrayTipo_Evento.forEach(element=>{
              if(element.nombre === 'Servicio'){
                this.servicios.id_tipo_evento = element.codigo
              }
            })
            localStorage.setItem('Servicio-desde',this.servicios.min)
            localStorage.setItem('Servicio-hasta',this.servicios.max)
            await this.dbContext.insertDataInto(Tables.Rango, this.servicios);
            
  }

}
