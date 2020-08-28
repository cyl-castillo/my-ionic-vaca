import { Component, OnInit, Input } from '@angular/core';
import { Tables } from 'src/app/models/enums';
import { ModalController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { ModalFilterPage } from '../modal-filter/modal-filter.page';
import { AddPage } from '../add/add.page';
import * as moment from 'moment';

@Component({
  selector: 'app-atender',
  templateUrl: './atender.page.html',
  styleUrls: ['./atender.page.scss'],
})
export class AtenderPage implements OnInit {

  public dinner: any;
  @Input() model ={
    codigo:null,
    fecha:moment().format('DD/MM/YYYY'),
    animal_codigo: null,
    tipo_evento: null,
  };
  constructor(private modalController: ModalController,private dbContext: DbcontextService,public loadingCtrl: LoadingController,private alertCtrl: AlertController, public navCtrl: NavController) { }

  ngOnInit() {
  }


  delete(codigo){
    this.dbContext.deleteFromTable(Tables.Eventos,codigo)
  }

  atender(){

  }


  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      message: '<strong>¿Seguro que desea borrar este evento?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //this.navCtrl.navigateForward('/evento-home')
            this.modalController.dismiss();
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.delete(this.model.codigo)
          }
        }
      ]
    });

    await alert.present();
  }


  async openModalWithData() {
    const modal = await this.modalController.create({
      component: AddPage,
      componentProps: {
        model: this.model
      }
    });
    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      this.model = dataReturned.data;
      console.log('Receive: ', this.dinner);
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending: ', this.model);
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
