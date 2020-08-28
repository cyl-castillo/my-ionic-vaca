import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { NetworkService } from '../services/network.service';
import { DbcontextService } from '../services/dbcontext.service';
import { Router } from '@angular/router';
import {Usuario} from '../models/models';
import { Tables } from '../models/enums';
import { element } from 'protractor';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.page.html',
  styleUrls: ['./sigin.page.scss'],
})
export class SiginPage implements OnInit {
  model = {
    usuario:'',
    clave: '',
    rolId:0,
    negocioId:0,
    idFinca:0,
  }
  usuario:Usuario
  usuarioArray:any[] = []
  fincaArray:any[] = []
  @ViewChild('passwordEyeRegister') passwordEye;
  passwordTypeInput = 'password'
  iconpassword = 'eye-off'
  constructor(private router: Router, private dbContext: DbcontextService,private networkService: NetworkService,public toastCtrl: ToastController,public loadingCtrl: LoadingController) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.presentLoading();
    if(localStorage.getItem('usuario_record') != undefined && localStorage.getItem('clave_record') != undefined){
        this.model.usuario = localStorage.getItem('usuario_record')
        this.model.clave = localStorage.getItem('clave_record')
    }
  }

  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Preparando base de datos',
    });
    return await loading.present().then(()=>{
      this.dbContext.initDB().finally(()=>{
        loading.dismiss()
      })
    });
  }

  recordar(){
    localStorage.setItem('usuario_record',this.model.usuario)
    localStorage.setItem('clave_record',this.model.clave)
  }

  async login(){
    this.recordar()
    if (this.model.usuario =="SuperAdmin" && this.model.clave =="Daniel*5678"){
      localStorage.setItem("usuario",this.model.usuario)
      localStorage.setItem("clave",this.model.clave)
      this.router.navigateByUrl('home');
    }else{
     
      this.usuarioArray = await this.dbContext.getDataFromTable(Tables.Usuario)
      if(this.usuarioArray.length !== 0){
        this.usuarioArray.forEach(element=>{
          let indexM = this.model.usuario.indexOf("@");
          let indexE = element.usuario.indexOf("@");

          if(indexM !== -1 && indexE !== -1 && element.usuario == this.model.usuario && bcrypt.compareSync(this.model.clave, element.clave)){
            localStorage.setItem("usuario",this.model.usuario)
            localStorage.setItem("clave",this.model.clave)
            localStorage.setItem("usuarioId",JSON.stringify(element.codigo))
            this.router.navigateByUrl('home');
          }else if(element.usuario.substr(0,indexE) == this.model.usuario.substr(0,indexM) && bcrypt.compareSync(this.model.clave, element.clave)){
            //this.presentToast('Usuario o Contraseña incorrectos');
            localStorage.setItem("usuario",this.model.usuario)
            localStorage.setItem("clave",this.model.clave)
            localStorage.setItem("usuarioId",JSON.stringify(element.codigo))
            this.router.navigateByUrl('home');
          }
        })
      }else{
        //this.presentToast('Usuario o Contraseña incorrectos');
      }
    }
  }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 300
    });
    return await toast.present();
  }

  togglePasswordMode(){
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
  }

  



}
