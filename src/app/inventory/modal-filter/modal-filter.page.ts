import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { Tables } from 'src/app/models/enums';

@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.page.html',
  styleUrls: ['./modal-filter.page.scss'],
})
export class ModalFilterPage implements OnInit {
  @Input() public lunch: any;
  public data = {
    number: '',
    raza: '',
    genero: ''
  };
  arrayResult:any[] = []
  arrayRaza:Array<any> = [];
  arrayAnimal:any[] = []
  arrayResult1:any[] = []
  filter = false

  constructor(private modalController: ModalController,private dbContext: DbcontextService) {}
  ngOnInit() {
    this.load()
  }

  async load(){
    this.arrayRaza = await this.dbContext.getDataFromTable(Tables.Raza)
  }
  
  async closeModal() {
    await this.modalController.dismiss();
  }

  limpiar(){
    this.data.number = ''
    this.data.raza = ''
    this.data.genero = ''
  }

  async buscar(){
    //this.arrayResult = await this.dbContext.filterAnimal(this.data)
    //await this.modalController.dismiss(this.arrayResult);
    this.arrayAnimal = await  this.dbContext.getDataFromTable(Tables.Animal);
    if(this.arrayAnimal.length > 0){
      this.filter = true
      console.log(this.arrayAnimal)
      /*this.arrayAnimal.forEach(element=>{
          if(String(element.animal_codigo).startsWith(`${this.data.number}`) || element.sexo == this.data.genero || element.razaId == this.data.raza){
              this.arrayResult = element
          }
      })*/
      this.arrayResult = await this.dbContext.filterAnimal(this.data)
      console.log(this.arrayResult)
      await this.modalController.dismiss(this.arrayResult);
    }
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
  
  addCodigo(codigo){
      this.data.number = codigo
      this.filter = false
      this.arrayResult = []
  }
  
  

}
