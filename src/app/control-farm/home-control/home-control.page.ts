import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-control',
  templateUrl: './home-control.page.html',
  styleUrls: ['./home-control.page.scss'],
})
export class HomeControlPage implements OnInit {
  btn_IngresoAFincas =true;
  btn_Ventas = true;
  btn_Muertes = true;
  nosync = true;


  constructor(private router: Router) {}

  navigateTo(page) {
    this.router.navigateByUrl(page);
  }

  ngOnInit() {
    if(localStorage.getItem("btn_IngresoAFincas") !== undefined){
      this.btn_IngresoAFincas = JSON.parse(localStorage.getItem("btn_IngresoAFincas"))
      this.nosync = false

    }
    if(localStorage.getItem("btn_Ventas") !== undefined){
      this.btn_Ventas = JSON.parse(localStorage.getItem("btn_Ventas"))
      this.nosync = false
      
    }
    if(localStorage.getItem("btn_Muertes") !== undefined){
      this.btn_Muertes = JSON.parse(localStorage.getItem("btn_Muertes"))
      this.nosync = false
      
    }
  }

}
