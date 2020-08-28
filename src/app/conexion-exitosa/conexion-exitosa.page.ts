import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DbcontextService } from '../services/dbcontext.service';

@Component({
  selector: 'app-conexion-exitosa',
  templateUrl: './conexion-exitosa.page.html',
  styleUrls: ['./conexion-exitosa.page.scss'],
})
export class ConexionExitosaPage implements OnInit {

  data:any
  constructor(private api: ApiService,private sql: DbcontextService) { }

  ngOnInit() {

    this.api.syncBD("animal","negocio").then(res=>{
      this.data = res
      console.log(res)
    })

    this.sql.insertDataInto("animal",this.data).then(res=>{
      console.log(res)
    })
  }

}
