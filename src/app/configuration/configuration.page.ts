import { Component, OnInit } from '@angular/core';
import {Tables} from '../models/enums';
import { NgZone  } from '@angular/core';
import {Events, ModalController} from '@ionic/angular';
import { RangoPage } from '../common/rango/rango.page';
import { DbcontextService } from '../services/dbcontext.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {

  evento = {
    celo: null,
    palpacion: null,
    servicio:null,
    parto:null
  };
  public nomenclators: Array<{ name: string, table: Tables}> = [
    {
      name : 'Fincas',
      table: Tables.Finca
    },
    {
      name : 'Lote',
      table: Tables.Lote
    },
    {
      name : 'Clientes',
      table: Tables.Clientes
    },
    {
      name : 'Motivos de venta',
      table: Tables.Motivo_Venta
    },
    {
      name : 'Motivos de muerte',
      table: Tables.Motivo_Muerte
    },
    {
      name : 'Inseminadores',
      table: Tables.Inseminadores
    },
    {
      name : 'Raza',
      table: Tables.Raza
    },
    {
      name : 'Enfermedades',
      table: Tables.Enfermedad
    },
    {
      name : 'Condición corporal',
      table: Tables.Condicion_Corporal
    },
    {
      name : 'Locomoción',
      table: Tables.Locomocion
    },
    {
      name : 'Servicios',
      table: Tables.Tipo_Servicios
    },
  ];

  model = {
    nombre:null,
    dia:null
  }
  negocio:any

  constructor(public events: Events, private zone: NgZone,private modalController: ModalController,private dbContext: DbcontextService) {
    // this.events.subscribe('updateScreen', () => {
    //   this.zone.run(() => {
    //     console.log('force update the screen');
    //     alert('force update the screen');
    //   });
    // });
  }

  public captureType(event: any): void {
    console.log(`Captured name by event value: ${event}`);
    // this.events.publish('updateScreen');
  }

  ngOnInit() {
    if(localStorage.getItem("celo") !== undefined){
      this.evento.celo = localStorage.getItem("celo")
    }
    if(localStorage.getItem("palpacion") !== undefined){
      this.evento.palpacion = localStorage.getItem("palpacion")
    }
    if(localStorage.getItem("servicio") !== undefined){
      this.evento.servicio = localStorage.getItem("servicio")
    }
    if(localStorage.getItem("parto") !== undefined){
      this.evento.parto = localStorage.getItem("parto")
    }
  }

  async celo(){
    localStorage.setItem("celo",this.evento.celo)
    this.model.nombre = 'celo'
    this.model.dia = this.evento.celo
    this.dbContext.insertDataInto(Tables.Dia_Evento,this.model)
    await console.log(localStorage.getItem("celo"))
  }

  async palpacion(){
    localStorage.setItem("palpacion",this.evento.palpacion)
    this.model.nombre = 'palpacion'
    this.model.dia = this.evento.palpacion
    await this.dbContext.insertDataInto(Tables.Dia_Evento,this.model)
  }

  async servicio(){
    localStorage.setItem("servicio",this.evento.servicio)
    this.model.nombre = 'servicio'
    this.model.dia = this.evento.servicio
    await this.dbContext.insertDataInto(Tables.Dia_Evento,this.model)
  }

  async parto(){
    localStorage.setItem("parto",this.evento.parto)
    this.model.nombre = 'parto'
    this.model.dia = this.evento.parto
    await this.dbContext.insertDataInto(Tables.Dia_Evento,this.model)
  }

  async rango(){
    const modal = await this.modalController.create({
      component: RangoPage,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }

  ionViewWillEnter(){
    if(localStorage.getItem("negocioNombre") !== undefined){
      this.negocio = localStorage.getItem("negocioNombre")
    }
  }

}
