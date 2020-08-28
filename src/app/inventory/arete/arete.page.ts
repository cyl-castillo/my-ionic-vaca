import { Component, OnInit } from '@angular/core';
import { Tables } from 'src/app/models/enums';
import { DbcontextService } from 'src/app/services/dbcontext.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-arete',
  templateUrl: './arete.page.html',
  styleUrls: ['./arete.page.scss'],
})
export class AretePage implements OnInit {
  arrayAnimal: any[] = [];
  filter: boolean;
  arrayResult: any[] = [];
  codigoMadre: boolean;

  animal_codigo_viejo:any

  animal_codigo_nuevo:any
  unicoanimal_codigo: boolean;
  animal_codigo: boolean;

  constructor(private router: Router,private dbContext: DbcontextService) { }

  ngOnInit() {
  }

  async searchDataV(animal_codigo){
    this.arrayAnimal = await  this.dbContext.getDataFromTable(Tables.Animal);
    if(this.arrayAnimal.length > 0){
      this.filter = true
      console.log(animal_codigo)
      console.log(this.arrayAnimal)
      this.arrayResult = this.arrayAnimal.filter(element=> String(element.animal_codigo).startsWith(`${animal_codigo}`))
      console.log(this.arrayResult)
    }
    this.codigoMadre = false
  }
  addCodigo(codigo){
      this.animal_codigo_viejo = codigo
      this.filter = false
      this.arrayResult = []
  }

  async searchData(){
    this.arrayAnimal = await  this.dbContext.getDataFromTable(Tables.Animal);
    this.arrayAnimal.forEach(element=>{
       if(element.animal_codigo == this.animal_codigo_nuevo){
        this.unicoanimal_codigo = true
       }else{
        this.unicoanimal_codigo = false
       }
    })
    this.animal_codigo = false
  }

  async actualizarcodigo(item_old:any,item_new:any){
    await this.dbContext.animal_codigoUpdate(Tables.Animal,item_old,item_new)
    await this.dbContext.animal_codigoUpdate1(Tables.Ventas,item_old,item_new)
    await this.dbContext.animal_codigoUpdate2(Tables.Muertes,item_old,item_new)
    await this.dbContext.animal_codigoUpdate3(Tables.Enfermedades,item_old,item_new)
    await this.dbContext.animal_codigoUpdate4(Tables.Mediciones_Fisicas,item_old,item_new)
    await this.dbContext.animal_codigoUpdate5(Tables.Produccion,item_old,item_new)
    await this.dbContext.animal_codigoUpdate6(Tables.Ingreso_Finca,item_old,item_new)
    await this.dbContext.animal_codigoUpdate7(Tables.Parto,item_old,item_new)
    await this.dbContext.animal_codigoUpdate8(Tables.Servicios,item_old,item_new)
    await this.dbContext.animal_codigoUpdate9(Tables.Lactancia,item_old,item_new)
    await this.dbContext.animal_codigoUpdate10(Tables.Eventos,item_old,item_new)
    await this.dbContext.animal_codigoUpdate11(Tables.Celos,item_old,item_new)
    await this.dbContext.animal_codigoUpdate12(Tables.Palpacion,item_old,item_new)
    await this.dbContext.animal_codigoUpdate13(Tables.Leche,item_old,item_new)
    await this.dbContext.animal_codigoUpdate14(Tables.Tratamiento,item_old,item_new)
}


  cancelar(){
    this.router.navigateByUrl('/inventory-home-hm')
  }

}
