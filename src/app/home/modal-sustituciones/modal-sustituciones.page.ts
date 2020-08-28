import { Component, OnInit } from '@angular/core';
import { Tables } from 'src/app/models/enums';
import * as moment from 'moment';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-sustituciones',
  templateUrl: './modal-sustituciones.page.html',
  styleUrls: ['./modal-sustituciones.page.scss'],
})
export class ModalSustitucionesPage implements OnInit {

  arrayBita:any[] = []
  arrayBitaToday: any;
  bitacora = false
  constructor(private insomnia: Insomnia,private dbContext: DbcontextService,private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.insomnia.keepAwake().then(()=>{
      console.log('success')
    })
    this.load()
  }

  async load(){
    if(this.arrayBita.length == 0){
      this.arrayBita = await this.dbContext.getDataFromTable(Tables.Bitacora)
    } 
    if(this.arrayBita.length !== 0){ 
      this.arrayBita.forEach(element=>{
          if(moment().format('DD-MM-YYYY') == element.fecha_generacion){
            this.arrayBitaToday.push(element)
            this.bitacora = true
            console.log(this.arrayBitaToday)
            
          }  
      })
    }
  }

  closeModal(){
    this.router.navigateByUrl('home/sincronizacion-home');
  }

}
