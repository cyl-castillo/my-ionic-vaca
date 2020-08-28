import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbcontextService } from '../services/dbcontext.service';
import { NetworkService } from '../services/network.service';
import { ToastController, LoadingController } from '@ionic/angular';
import {Usuario,Rol} from '../models/models';
import { Tables } from '../models/enums';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  model = {
    usuario:'',
    clave: '',
    rolId:0,
    idFinca:0,
  }
  usuario:Usuario

  rol: Rol
  constructor(private router: Router, private insomnia: Insomnia, private dbContext: DbcontextService,private networkService: NetworkService,public toastCtrl: ToastController,public loadingCtrl: LoadingController) { 
  }

  ngOnInit() {
    // this.load()
  }

  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
  }


  login(){
    if (this.model.usuario =="SuperAdmin" && this.model.clave =="Daniel*5678"){
      this.router.navigateByUrl('conexion');
    }else{
      this.presentToast('Usuario o Contraseña incorrectos');
    }
       
  }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    return await toast.present();
  }



  async load(){
    let model1 = {
      usuario:'superAdmin',
      clave: 'Daniel*5678',
      rolId:1,
      idFinca:null,
    }
  
  
    let rol = {
      nombre:'Administrador',
    }
    await this.dbContext.insertDataInto(Tables.Rol,rol);
    await this.dbContext.insertDataInto(Tables.Usuario,model1);
  }

}
