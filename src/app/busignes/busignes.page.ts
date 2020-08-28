import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { DbcontextService } from '../services/dbcontext.service';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { element } from 'protractor';
import { Tables } from '../models/enums';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-busignes',
  templateUrl: './busignes.page.html',
  styleUrls: ['./busignes.page.scss'],
})
export class BusignesPage implements OnInit {

  arrayNegocio:any[] = []

  model = {
    nombre:null,
    jefe: null,
    telf: null
  }
  idNegocio: any

  constructor(private dbContext: DbcontextService,private insomnia: Insomnia, public navCtrl: NavController,private router: Router,private api:ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
    this.load()
  }

  async load(){
    this.api.login('apk@test.com','apktest123').then(res=>{
      console.log(res)
    })
    this.api.negocio().then(res=>{
      this.arrayNegocio = res['data']
    })
  }

  async save(){
    localStorage.setItem("negocio",JSON.stringify(this.idNegocio))
    await this.dbContext.insertDataInto(Tables.Negocio,this.model)
    // alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Negocio)))
    this.navCtrl.navigateForward('/home')
  }

  async selectFinca($event){
    console.log($event)
    console.log(this.arrayNegocio)
    this.arrayNegocio.forEach(element=>{
      if(element.code == $event){
        this.model.nombre = element.nombre
        this.model.jefe = element.jefe
        this.model.telf = element.telefono
        localStorage.setItem("negocio",JSON.stringify(element.code))
        console.log(element.code)
        localStorage.setItem("negocioNombre",JSON.stringify(element.nombre))
      }
    })
    console.log(this.model)
  }

}
