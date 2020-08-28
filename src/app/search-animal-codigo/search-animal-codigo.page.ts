import { Component, OnInit, Input } from '@angular/core';
import { DbcontextService } from '../services/dbcontext.service';
import { Tables } from '../models/enums';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-animal-codigo',
  templateUrl: './search-animal-codigo.page.html',
  styleUrls: ['./search-animal-codigo.page.scss'],
})
export class SearchAnimalCodigoPage implements OnInit {

  arrayAnimal:any[] = []
  arrayCria:any[] = []
  @Input() public animal_codigo: any;
  @Input() public animal_cria: any;
  constructor(private dbContext: DbcontextService,private navParams: NavParams,private modalController: ModalController) { }

  ngOnInit() {
    this.animal_codigo = this.navParams.get('animal_codigo')
     this.load(this.animal_codigo,this.animal_cria)
  }

  async load(animal_codigo?,animal_cria?){
    if(this.animal_codigo !== null){
      this.arrayAnimal = await this.dbContext.getAnimalCodigo(Tables.Animal,animal_codigo)
    }
    if(this.animal_cria !== null){
      this.arrayCria = await this.dbContext.getCriaCodigo(Tables.Animal,animal_cria)
    }
   
  }

  codigo(animal_codigo){
    this.modalController.dismiss(animal_codigo)
  }

  codigocria(animal){
    this.modalController.dismiss(animal)
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
