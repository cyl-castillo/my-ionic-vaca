import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Tables } from 'src/app/models/enums';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { ModalController } from '@ionic/angular';
import { SearchAnimalCodigoPage } from 'src/app/search-animal-codigo/search-animal-codigo.page';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { element } from 'protractor';


@Component({
  selector: 'app-animal-historical',
  templateUrl: './animal-historical.page.html',
  styleUrls: ['./animal-historical.page.scss'],
})
export class AnimalHistoricalPage implements OnInit {

  cantDia:any
  canlact:any
  canevent:any

  dia = false
  leche = false
  arrayAnimal:any[] = []
  arrayLactancia:any[] = []

  arrayEvento:any[] = []
  arrayCelo:any[] = []
  arrayPalpacion:any[] = []
  arrayServicio:any[] = []
  arrayParto:any[] = []
  arrayLeche:any[] = []
  arrayEnfermedad:any[] = []
  arrayMediciones:any[] = []
  arrayRaza:any[] = []
  arrayPeso: any[] = [];

  rows:Array<{
    fecha: any,
    leche: string,
    concentrado: number,
    peso: number
  }> = []
  rows_evento:Array<{
    fecha:any,
    tipo_evento: string,
  }> = []

  rows_celos:Array<{
    fecha:any,
    animal_codigo: number,
    icon:any
  }> = []

  rows_palpacion:Array<{
    fecha:any,
    animal_codigo: number,
    icon:any
  }> = []

  rows_servicio:Array<{
    fecha:any,
    animal_inseminador: number,
    animal_inseminado: number,
    codigo_semen:number,
    inseminador_codigo:number,
    icon:any
  }> = []


  rows_parto:Array<{
    fecha:any,
    codigoMadre: number,
    sexo: any,
    razaId: number,
    codigoCria: number,
    icon:any
  }> = []


  rows_leche:Array<{
    fecha:any,
    peso: any,
  }> = []

  rows_peso:Array<{
    fecha:any,
    peso: any,
  }> = []

  rows_enfermedad:Array<{
    fecha:any,
    nombre:any
  }> = []

  rows_mediciones:Array<{
    fecha:any,
    condicionId: any,
    locomocionId: any,
  }> = []

  animal_codigo:any
  cria:any = null;
  cancelo: number;
  canserv: number;
  canpart: number;
  canlech: number;
  canenferm: number;
  canmed: number;
  lactancias: boolean;
  evento: boolean;
  celo: boolean;
  servicios: boolean;
  partos: boolean;
  enfermedades: boolean;
  medicion: boolean;

  arrayResult:any[] = []
  arrayEnf:any[] = []
  filter = false

  animal_historico ={
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
    ultimo_estado:null
  };
  razanombre: any;
  sexonombre: string;
  genero: string;
  historico = false
  public isLactanciaOpen = false;
  iseventosOpen = false;
  iscelosOpen = false;
  isservicioOpen = false;
  ispartoOpen = false;
  islecheOpen = false;
  isenfermedadOpen = false;
  ismedicionesOpen = false;
  isPesoOpen = false;
  fecha: string;

  iconL: string = "arrow-forward";
  iconE: string = "arrow-forward";
  iconC: string = "arrow-forward";
  iconS: string = "arrow-forward";
  iconP: string = "arrow-forward";
  iconPe: string = "arrow-forward";
  iconLe: string = "arrow-forward";
  iconEn: string = "arrow-forward";
  iconM: string = "arrow-forward";
  isPartosTotalOpen = false;
  iconPT: string = "arrow-forward"
  iconPM: string = "arrow-forward"
  isPartosMuertoOpen = false;
  isPartosVivosOpen = false;
  iconPV: string = "arrow-forward"
  isUbicacionOpen = false;
  iconU: string = "arrow-forward"
  isEstadoOpen = false;
  iconEs: string = "arrow-forward"

  iconPL: string = "arrow-forward";
  isPalpacionOpen = false;

  rows_estado:Array<{
    fecha:any,
    nombre:any
  }> = []

  rows_ubicacion:Array<{
    fecha:any,
    nombre:any
  }> = []

  rows_parto_vivo:Array<{
    fecha:any,
    total:any
    icon:any
  }> = []

  rows_parto_muerto:Array<{
    fecha:any,
    total:any
    icon:any
  }> = []

  rows_parto_total:Array<{
    fecha:any,
    total:any
    icon:any
  }> = []
  arrayEstado: any[] = [];
  arrayUbicacion: any[] = [];
  arrayPartoVivo: any[] = [];
  arrayPartoMuerto: any[] = [];
  arrayPartoTotal: any[] = [];
  arrayFinca: any[] = [];
  arrayLote: any[] = [];
  arrayHistorico: any[] = [];
  finca_lote:any
  ultimo_estado:any
  arrayLocomocion: any[] = [];
  arrayCondicion: any[] = [];
  
  partosvivos: number = 0;
  partosmuertos: number = 0;
  partostotal: number = 0;

  constructor(private dbContext: DbcontextService,public modalCtrl: ModalController,private insomnia: Insomnia) { }

  columns = [
    { prop: 'fecha', name: 'Dia', width: '20%' },
    { prop: 'leche', name: 'Leche', width: '25%'  },
    { prop: 'concentrado', name: 'Conc', width: '30%'  },
    { prop: 'peso', name: 'Peso (Kg)', width: '25'  }
  ];

  columns_evento = [
    { prop: 'fecha', name: 'Dia', width: '20%' },
    { prop: 'tipo_evento', name: 'Evento', width: '25%'  },
  ];


  columns_celos = [
    { prop: 'fecha', name: 'Dia', width: '20%' },
    { prop: 'animal_codigo', name: 'Numero Animal', width: '25%'  },
  ];

  columns_servicio = [
    { prop: 'fecha', name: 'Dia', width: '20%' },
    { prop: 'animal_inseminador', name: 'Anim Inseminador', width: '25%'  },
    { prop: 'animal_inseminado', name: 'Inseminado', width: '30%'  },
    { prop: 'inseminador_codigo', name: 'inseminador', width: '25'  }
  ];

  columns_parto = [
    { prop: 'fecha', name: 'Dia', width: '20%' },
    { prop: 'codigoMadre', name: 'codigo Madre', width: '25%'  },
    { prop: 'sexo', name: 'Sexo', width: '30%'  },
    { prop: 'razaId', name: 'Raza', width: '25'  },
    { prop: 'codigoCria', name: 'Cria', width: '25'  }
  ];

  columns_leche = [
    { prop: 'fecha', name: 'Dia', width: '20%' },
    { prop: 'peso', name: 'Peso (l)', width: '25%'  },
  ];

  columns_enfermedad = [
    { prop: 'nombre', name: 'Nombre', width: '20%' },
  ];

  columns_mediciones = [
    { prop: 'fecha', name: 'Dia', width: '20%' },
    { prop: 'condicionId', name: 'condicionId', width: '25%'  },
    { prop: 'locomocionId', name: 'Locomocion', width: '30%'  },
  ];
  /*rows = [
    {
      day: '1',
      milk: '25',
      concentrated: 10,
      weight: 22
    },
    {
      day: '1',
      milk: '25',
      concentrated: 10,
      weight: 22
    },
    {
      day: '1',
      milk: '25',
      concentrated: 10,
      weight: 22
    },
    {
      day: '1',
      milk: '25',
      concentrated: 10,
      weight: 22
    },
    {
      day: '1',
      milk: '25',
      concentrated: 10,
      weight: 22
    },
    {
      day: '1',
      milk: '25',
      concentrated: 10,
      weight: 22
    },
    {
      day: '1',
      milk: '25',
      concentrated: 10,
      weight: 22
    }
  ];*/

  tablestyle = 'bootstrap';

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
    this.loadData()
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
  addCodigo(animal){
      this.animal_codigo = animal.animal_codigo
      this.filter = false
      this.arrayResult = []
      this.animal_historico = animal
      this.animal_historico.fecha = moment(animal).format('DD-MM-YYYY')
      if(this.animal_historico.ultimo_estado == 1){
        this.ultimo_estado = 'Celo'
      }
      if(this.animal_historico.ultimo_estado == 2){
        this.ultimo_estado = 'Serviciada Positivo'
      }
      if(this.animal_historico.ultimo_estado == 3){
        this.ultimo_estado  = 'Serviciada Negativo'
        
      }
      if(this.animal_historico.ultimo_estado == 4){
        this.ultimo_estado = 'Palpada Positiva'
        
      }
      if(this.animal_historico.ultimo_estado == 5){
        this.ultimo_estado = 'Palpada Negativa'
        
      }
      if(this.animal_historico.ultimo_estado == 6){
        this.ultimo_estado = 'Normal'  
      }
      this.historico = true
      this.listar(animal.animal_codigo)
  }

  raza(id){
    this.arrayRaza.forEach(element=>{
      if(element.codigo == id){
         this.razanombre = element.nombre
      }
    })
    return this.razanombre
  }

  sexo(sexo){

    /*if(id == 1){
      this.sexonombre = 'Hembra'
      this.genero = 'female'
    }else if(id == 2){
      this.sexonombre = 'Macho'
      this.genero = 'male'
    }*/
    if(sexo == 'Hembra'){
      this.sexonombre = 'Hembra'
      this.genero = 'female'

    }else if(sexo == 'Macho'){
      this.sexonombre = 'Macho'
      this.genero = 'male'
    }
    return this.sexonombre

  }

  public lactanciaAccordion() {
  
    if (this.isLactanciaOpen) {
     this.isLactanciaOpen = false;
     this.iconL = "arrow-forward"

    } else {
     
     this.isLactanciaOpen = true;
     this.iconL = "arrow-down";
    }
  }

  public estadoAccordion() {
  
    if (this.isEstadoOpen) {
     this.isEstadoOpen = false;
     this.iconEs = "arrow-forward"

    } else {
     
     this.isEstadoOpen = true;
     this.iconEs = "arrow-down";
    }
  }

  public ubicacionAccordion() {
  
    if (this.isUbicacionOpen) {
     this.isUbicacionOpen = false;
     this.iconU = "arrow-forward"

    } else {
     
     this.isUbicacionOpen = true;
     this.iconU = "arrow-down";
    }
  }

  public partosVivosAccordion() {
  
    if (this.isPartosVivosOpen) {
     this.isPartosVivosOpen = false;
     this.iconPV = "arrow-forward"

    } else {
     
     this.isPartosVivosOpen = true;
     this.iconPV = "arrow-down";
    }
  }


  public partosMuertosAccordion() {
  
    if (this.isPartosMuertoOpen) {
     this.isPartosMuertoOpen = false;
     this.iconPM = "arrow-forward"

    } else {
     
     this.isPartosMuertoOpen = true;
     this.iconPM = "arrow-down";
    }
  }

  public partosTotalAccordion() {
  
    if (this.isPartosTotalOpen) {
     this.isPartosTotalOpen = false;
     this.iconPT = "arrow-forward"

    } else {
     
     this.isPartosTotalOpen = true;
     this.iconPT = "arrow-down";
    }
  }

  public eventosAccordion() {
    if (this.iseventosOpen) {
      this.iseventosOpen = false;
     this.iconE = "arrow-forward"

    } else {
      this.iseventosOpen = true;
     this.iconE = "arrow-down";

    }
  }

  public celosAccordion() {
    if (this.iscelosOpen) {
      this.iscelosOpen = false
      this.iconC = "arrow-forward"
    } else {  
      this.iscelosOpen = true
      this.iconC = "arrow-down"
    }
  }

  public palpacionAccordion() {
    if (this.isPalpacionOpen) {
      this.isPalpacionOpen = false
      this.iconPL = "arrow-forward"
    } else {  
      this.isPalpacionOpen = true
      this.iconPL = "arrow-down"
    }
  }

  public servicioAccordion() {

    if (this.isservicioOpen) {
      this.isservicioOpen = false
      this.iconS = "arrow-forward"
    } else {  
      this.isservicioOpen = true
      this.iconS = "arrow-down"
    }
  }

  public partoAccordion() {

    if (this.ispartoOpen) {
      this.ispartoOpen = false
      this.iconP = "arrow-forward"
    } else {  
      this.ispartoOpen = true
      this.iconP = "arrow-down"
    }
  }

  public lechesAccordion() {

    if (this.islecheOpen) {
      this.islecheOpen = false
      this.iconLe = "arrow-forward"
    } else {  
      this.islecheOpen = true
      this.iconLe = "arrow-down"
    }
  }

  public pesoAccordion() {

    if (this.isPesoOpen) {
      this.isPesoOpen = false
      this.iconPe = "arrow-forward"
    } else {  
      this.isPesoOpen = true
      this.iconPe = "arrow-down"
    }
  }

  public enfermedadAccordion() {
   
    if (this.isenfermedadOpen) {
      this.isenfermedadOpen = false
      this.iconEn = "arrow-forward"
    } else {  
      this.isenfermedadOpen = true
      this.iconEn = "arrow-down"
    }
  }

  public medicionesAccordion() {

    if (this.ismedicionesOpen) {
      this.ismedicionesOpen = false
      this.iconM = "arrow-forward"
    } else {  
      this.ismedicionesOpen = true
      this.iconM = "arrow-down"
    }
  }

  async search(){
    //this.cria = await this.dbContext.getElementByAttrTable("animal_nacido_codigo",this.animal_codigo, "parto")
    const modal = await this.modalCtrl.create({
      component: SearchAnimalCodigoPage,
      componentProps: {
        animal_cria: this.animal_codigo,
      },
      cssClass: 'searchmodal',
      backdropDismiss: false
    });
    modal.onWillDismiss().then(dataReturned => {
      this.cria = dataReturned.data;
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending: ', this.animal_codigo);
    });
  }


  cantDias(fecha){
    var fecha1 = fecha;
    let fechanow =moment().format('DD/MM/YYYY')
    var fecha2 = moment(fechanow);
    this.cantDia = fecha2.diff(fecha1, 'days')
    return this.dia = true

  }

  diaslact(fecha){
    var fecha1 = fecha;
    let fechanow =moment().format('DD/MM/YYYY')
    var fecha2 = moment(fechanow);
    this.canlact = fecha2.diff(fecha1, 'days')
  
  }
  diasevent(fecha){
    var fecha1 = fecha;
    let fechanow =moment().format('DD/MM/YYYY')
    var fecha2 = moment(fechanow);
    this.canevent = fecha2.diff(fecha1, 'days')
  
  }

  diascelo(fecha){
    var fecha1 = fecha;
    let fechanow =moment().format('DD/MM/YYYY')
    var fecha2 = moment(fechanow);
    this.cancelo = fecha2.diff(fecha1, 'days')
  
  }

  diasserv(fecha){
    var fecha1 = fecha;
    let fechanow =moment().format('DD/MM/YYYY')
    var fecha2 = moment(fechanow);
    this.canserv = fecha2.diff(fecha1, 'days')
  
  }

  diaspart(fecha){
    var fecha1 = fecha;
    let fechanow =moment().format('DD/MM/YYYY')
    var fecha2 = moment(fechanow);
    this.canpart = fecha2.diff(fecha1, 'days')
  
  }

  diasleche(fecha){
    var fecha1 = fecha;
    let fechanow =moment().format('DD/MM/YYYY')
    var fecha2 = moment(fechanow);
    this.canlech = fecha2.diff(fecha1, 'days')
  
  }

  diasenferm(fecha){
    var fecha1 = fecha;
    let fechanow =moment().format('DD/MM/YYYY')
    var fecha2 = moment(fechanow);
    this.canenferm = fecha2.diff(fecha1, 'days')
  
  }

  diasmed(fecha){
    var fecha1 = fecha;
    let fechanow =moment().format('DD-MM-YYYY')
    var fecha2 = moment(fechanow);
    this.canmed = fecha2.diff(fecha1, 'days')
  
  }

  


  listar(animal_codigo){
    this.lactancia(animal_codigo)
    this.eventos(animal_codigo)
    this.celos(animal_codigo)
    this.palpacion(animal_codigo)
    this.servicio(animal_codigo)
    this.parto(animal_codigo)
    this.leches(animal_codigo)
    this.enfermedad(animal_codigo)
    this.mediciones(animal_codigo)
    this.estado(animal_codigo)
    this.ubicacion(animal_codigo)
    this.partosVivos(animal_codigo)
    this.partosMuertos(animal_codigo)
    this.partosTotal(animal_codigo)
    this.peso(animal_codigo)
  }

  async estado(codigo){
    if(this.arrayAnimal.length == 0){
      this.arrayAnimal =  await  this.dbContext.getDataFromTable(Tables.Animal)
    }
    if(this.arrayAnimal.length != 0){
      this.arrayAnimal.forEach(element=>{
        if(element.animal_codigo === codigo){
          if(element.ultimo_estado == 1){
            this.rows_estado.push({
              fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
              nombre: 'Celo',
            })
          }
          if(element.ultimo_estado == 2){
            this.rows_estado.push({
              fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
              nombre: 'Serviciada Positivo',
            })
          }
          if(element.ultimo_estado == 3){
            this.rows_estado.push({
              fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
              nombre: 'Serviciada Negativo',
            })
          }
          if(element.ultimo_estado == 4){
            this.rows_estado.push({
              fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
              nombre: 'Palpada Positiva',
            })
          }
          if(element.ultimo_estado == 5){
            this.rows_estado.push({
              fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
              nombre: 'Palpada Negativa',
            })
          }
          if(element.ultimo_estado == 6){
            this.rows_estado.push({
              fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
              nombre: 'Normal',
            })
          }
        }
     })
    }
  }

  async ubicacion(codigo){
    if(this.arrayUbicacion.length == 0){
      this.arrayUbicacion =  await  this.dbContext.getDataFromTable(Tables.Ingreso_Finca)
      this.arrayFinca =  await  this.dbContext.getDataFromTable(Tables.Finca)
      this.arrayLote =  await  this.dbContext.getDataFromTable(Tables.Lote)  
    }
    if(this.arrayUbicacion.length != 0){
      this.arrayUbicacion.forEach(element=>{
        if(element.animal_codigo === codigo){
          this.arrayLote.forEach(elem=>{
            if(elem.idLote == element.loteId && elem.fincaId == element.fincaId){
              this.arrayFinca.forEach(ele=>{
                if(element.idfinca == elem.fincaId){
                  this.finca_lote = `${ele.nombre}-${elem.nombre}`
                  this.rows_ubicacion.push({
                    fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
                    nombre: this.finca_lote,
                  })
                }
              })
           }
          })

        }
     })
    
    }
     
  }

  async partosVivos(codigo){
    let count = 0
    if(this.arrayPartoVivo.length == 0){
      this.arrayPartoVivo =  await  this.dbContext.getDataFromTable(Tables.Parto)
      this.arrayHistorico = await this.dbContext.getDataFromHistorico(Tables.Historico)
      count = this.arrayPartoVivo.filter(element=>{
        return element.animal_codigo === codigo && element.parto == 1
      }).length
      this.partosvivos = this.arrayPartoVivo.filter(element=>{
        return element.animal_codigo === codigo && element.parto == 1
      }).length
    }
    
    if(this.arrayPartoVivo.length != 0){
      let active:any = this.arrayHistorico.find(element=>element.animal_codigo == codigo).active
      this.arrayPartoVivo.forEach(element=>{
        if(element.animal_codigo === codigo){
              this.diaspart(element.fecha)
              this.rows_parto_vivo.push({
                fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
                total: count,
                icon: active
              })
        }
     }) 
    }
          
  }

  async partosMuertos(codigo){
    let count = 0
    if(this.arrayPartoMuerto.length == 0){
      this.arrayPartoMuerto =  await  this.dbContext.getDataFromTable(Tables.Parto)
      this.arrayHistorico = await this.dbContext.getDataFromHistorico(Tables.Historico)
      count = this.arrayPartoMuerto.filter(element=>{
        return element.animal_codigo === codigo && element.parto == 0
      }).length
      this.partosmuertos = this.arrayPartoMuerto.filter(element=>{
        return element.animal_codigo === codigo && element.parto == 0
      }).length
    }
    
    if(this.arrayPartoMuerto.length != 0){
      let active:any = this.arrayHistorico.find(element=>element.animal_codigo == codigo).active
      this.arrayPartoMuerto.forEach(element=>{
        if(element.animal_codigo === codigo){
              this.diaspart(element.fecha)
              this.rows_parto_muerto.push({
                fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
                total: count,
                icon: active
              })       
        }
     }) 
    }
        
  }

  async partosTotal(codigo){
    if(this.arrayPartoTotal.length == 0){
      this.arrayPartoTotal =  await  this.dbContext.getDataFromTable(Tables.Parto)
      this.arrayHistorico = await this.dbContext.getDataFromHistorico(Tables.Historico)
      this.partostotal = this.partosvivos + this.partosmuertos
    }
    
    if(this.arrayPartoTotal.length != 0){
      let active:any = this.arrayHistorico.find(element=>element.animal_codigo == codigo).active
      let total = this.arrayPartoTotal.length
      this.arrayPartoTotal.forEach(element=>{
        if(element.animal_codigo === codigo){
              this.diaspart(element.fecha)
              this.rows_parto_total.push({
                fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
                total: total,
                icon: active
              })  
        }
     })
    }
        
     
    
  }

  async lactancia(codigo){
    if(this.arrayLactancia.length == 0){
      this.arrayLactancia =  await  this.dbContext.getDataFromTable(Tables.Lactancia)
    }
   
    if(this.arrayLactancia.length != 0){
      this.arrayLactancia.forEach(element=>{
        if(element.animal_codigo === codigo){
          this.diaslact(element.fecha)
          this.rows.push({
            fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
            leche: element.leche,
            concentrado: element.concentrado,
            peso: element.peso
          })
        }
     })
    }
  }

  async eventos(codigo){
    let parto:any
    let palpacion:any
    let celo:any
    let servicio:any
    if(this.arrayEvento.length == 0){
      this.arrayEvento =  await  this.dbContext.getDataFromTable(Tables.Eventos)
    }
    if(this.arrayEvento.length != 0){
      this.arrayEvento.forEach(element=>{
        if(element.animal_codigo === codigo){
          if(element.tipo_evento == 'parto'){
                parto = 'Se requiere parto'
                this.rows_evento.push({
                  fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
                  tipo_evento: parto
                })
          }
          if(element.tipo_evento == 'palpacion'){
            palpacion = 'Se requiere palpación'
            this.rows_evento.push({
              fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
              tipo_evento: palpacion
            })
          }
          if(element.tipo_evento == 'celo'){
            celo = 'Se requiere monta'
            this.rows_evento.push({
              fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
              tipo_evento: celo
            })
          }
          if(element.tipo_evento == 'servicio'){
            servicio = 'Se requiere un servicio'
            this.rows_evento.push({
              fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
              tipo_evento: servicio
            })
          }
          this.diasevent(element.fecha)
          
        }
     })
    }
    
    // return this.evento = true
  }

  async celos(codigo){
    if(this.arrayCelo.length == 0){
      this.arrayCelo =  await  this.dbContext.getDataFromTable(Tables.Celos)
      this.arrayHistorico = await this.dbContext.getDataFromHistorico(Tables.Historico)
      
    }
   if(this.arrayCelo.length != 0){
    let active:any = this.arrayHistorico.find(element=>element.animal_codigo == codigo).active
    this.arrayCelo.forEach(element=>{
      if(element.animal_codigo === codigo){
            this.diascelo(element.fecha)
            this.rows_celos.push({
              fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
              animal_codigo: element.animal_codigo,
              icon: active
            })
          }})
   }
     
    // return this.celo = true
  }

  async palpacion(codigo){
    if(this.arrayPalpacion.length == 0){
      this.arrayPalpacion =  await  this.dbContext.getDataFromTable(Tables.Palpacion)
      this.arrayHistorico = await this.dbContext.getDataFromHistorico(Tables.Historico)
      
    }
   if(this.arrayPalpacion.length != 0){
    let active:any = this.arrayHistorico.find(element=>element.animal_codigo == codigo).active
    this.arrayPalpacion.forEach(element=>{
      if(element.animal_codigo === codigo){
            this.diascelo(element.fecha)
            this.rows_palpacion.push({
              fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
              animal_codigo: element.animal_codigo,
              icon: active
            })
          }})
   }
     
    // return this.celo = true
  }


  async servicio(codigo){
    if(this.arrayServicio.length == 0){
      this.arrayServicio =  await  this.dbContext.getDataFromTable(Tables.Servicios)
      this.arrayHistorico = await this.dbContext.getDataFromHistorico(Tables.Historico)  
    }
   if(this.arrayServicio.length != 0){
      let active:any = this.arrayHistorico.find(element=>element.animal_codigo == codigo).active
      this.arrayServicio.forEach(element=>{
        if(element.animal_codigo === codigo){
              this.diasserv(element.fecha)
              this.rows_servicio.push({
                fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
                animal_inseminador: element.animal_inseminador_codigo,
                animal_inseminado: element.animal_inseminado_codigo,
                codigo_semen: element.semen_codigo,
                inseminador_codigo: element.persona_inseminador_codigo,
                icon: active
              })
        }
      })
   }
    
    
    // return this.servicios = true
  }

  async parto(codigo){
    if(this.arrayParto.length == 0){
      this.arrayParto =  await  this.dbContext.getDataFromTable(Tables.Parto)
      this.arrayHistorico = await this.dbContext.getDataFromHistorico(Tables.Historico)  
    }

    if(this.arrayParto.length != 0){
      let active:any = this.arrayHistorico.find(element=>element.animal_codigo == codigo).active
    
      this.arrayParto.forEach(element=>{
        if(element.animal_codigo === codigo){
          
              this.diaspart(element.fecha)
              this.rows_parto.push({
                fecha: moment(element.fecha).format('DD-MMM-YY'),
                sexo: element.sexo,
                razaId: element.razaId,
                codigoCria: element.codigoCria,
                codigoMadre: element.codigoMadre,
                icon: active
              })
        }
      })
  
    }
    // return this.partos = true
  }

  async leches(codigo){
    if(this.arrayLeche.length == 0){
      this.arrayLeche =  await  this.dbContext.getDataFromTable(Tables.Leche)
    }
    if(this.arrayLeche.length != 0){
      this.arrayLeche.forEach(element=>{
        if(element.animal_codigo === codigo){
          this.diasleche(element.fecha)
          this.rows_leche.push({
            fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
            peso: element.peso,
          })
        }
     })
    }
    
    // return this.leche = true
  }

  async peso(codigo){
    if(this.arrayPeso.length == 0){
      this.arrayPeso =  await  this.dbContext.getDataFromTable(Tables.Produccion)
    }
    if(this.arrayPeso.length != 0){
        this.arrayPeso.forEach(element=>{
          if(element.animal_codigo === codigo){
            this.rows_peso.push({
              fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
              peso: element.peso,
            })
          }
      })
    }
    // return this.leche = true
  }

  async enfermedad(codigo){
    if(this.arrayEnfermedad.length == 0){
      this.arrayEnfermedad =  await  this.dbContext.getDataFromTable(Tables.Enfermedades)
      this.arrayEnf = await this.dbContext.getDataFromTable(Tables.Enfermedad)  
    }
   if(this.arrayEnfermedad.length != 0){
        this.arrayEnfermedad.forEach(element=>{
          if(element.animal_codigo === codigo){
            this.arrayEnf.forEach(ele=>{
              if(ele.codigo == element.enfermedad_codigo){
                this.rows_enfermedad.push({
                  fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
                  nombre: ele.nombre,
                })
              }
            })

          }
      })
   }
    
    // return this.enfermedades = true
  }

  async mediciones(codigo){
    let locomocion:any
    let condicion:any
    if(this.arrayMediciones.length == 0){
      this.arrayMediciones =  await  this.dbContext.getDataFromTable(Tables.Mediciones_Fisicas)
      this.arrayLocomocion = await this.dbContext.getDataFromTable(Tables.Locomocion)
      this.arrayCondicion = await this.dbContext.getDataFromTable(Tables.Condicion_Corporal)  
    }
   if(this.arrayMediciones.length != 0){
        this.arrayMediciones.forEach(element=>{
          if(element.animal_codigo === codigo){
            this.diasmed(element.fecha)
              this.arrayLocomocion.forEach(ele => {
                if(ele.codigo == element.locomocion_codigo){
                  locomocion = ele.nombre
                }
              });
              this.arrayCondicion.forEach(elem => {
                if(elem.codigo == element.condicion_corporal_codigo){
                  condicion = elem.nombre
                }
              });
            this.rows_mediciones.push({
              fecha: moment(element.fecha, 'DD-MM-YYYY').format('DD-MMM-YY'),
              condicionId: condicion,
              locomocionId: locomocion,
            })
          }
      })
   }
    
    // return this.medicion = true
  }
  async loadData(){
    this.arrayRaza = await this.dbContext.getDataFromTable(Tables.Raza)
  }

}
