import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast: any;

  constructor(public toastController: ToastController) { }

  showToastSuccess(msg) {
    this.toast = this.toastController.create({
      message: msg,
      color: 'success',
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }

  showToastError(msg) {
    this.toast = this.toastController.create({
      message: msg,
      color: 'success',
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }
}
