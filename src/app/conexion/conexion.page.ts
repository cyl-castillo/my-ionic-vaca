import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { NetworkService } from '../services/network.service';
import { DbcontextService } from '../services/dbcontext.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Tables } from '../models/enums';


@Component({
  selector: 'app-conexion',
  templateUrl: './conexion.page.html',
  styleUrls: ['./conexion.page.scss'],
})
export class ConexionPage implements OnInit {
  isConnected:any
  model = {
    url:'',
  usuario:'',
  contraseña:'',
  puerto: 0
  }

  direccion:any
  protocolo:any
  puerto: number
  url:any

  sincronizacion ={
    nombre:null,
    codigo_remoto:null,
    fecha:moment().format('DD/MM/YYYY'),
    id_usuario:null,
    data:null,
    accion:null
  };
  constructor(private router: Router, private dbContext: DbcontextService,private networkService: NetworkService,public toastCtrl: ToastController,public loadingCtrl: LoadingController) { }

  ngOnInit() {
    //this.testconnetion();
  }


  async conexion(){
    this.url = this.protocolo + "://" + this.direccion + ":" + this.puerto
    alert(JSON.stringify(this.url))
      /*if(this.isConnected){
        this.sincronizacion.nombre = 'Database_Conexion'
        this.sincronizacion.id_usuario = JSON.parse(localStorage.getItem("currentUser"))
        this.sincronizacion.data = this.model
        this.sincronizacion.accion = 'Insertar'
        await this.dbContext.insertDataInto(Tables.Database_Conexion,this.model).then(res=>{
          this.router.navigateByUrl('sigin');
        })
      }
       await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);*/
  }


  testconnetion(){
    this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
      this.isConnected = connected;
      if (!this.isConnected) {
        this.presentToast('No hay conexión a Internet en este momento para sincronizar');
      }else{
        
      }
    });
    
  }


  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    return await toast.present();
  }


}
