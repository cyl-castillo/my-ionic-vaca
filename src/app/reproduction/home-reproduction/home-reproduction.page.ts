import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-reproduction',
  templateUrl: './home-reproduction.page.html',
  styleUrls: ['./home-reproduction.page.scss'],
})
export class HomeReproductionPage implements OnInit {
  btn_Partos = false;
  btn_Servicios = false;
  btn_Celo = false;
  btn_Palpacion = false;
  nosync = false;


  ngOnInit() {
    if(localStorage.getItem("btn_Partos") !== undefined){
      this.btn_Partos = true
      this.nosync = false

    }
    if(localStorage.getItem("btn_Servicios") !== undefined){
      this.btn_Servicios = true
      this.nosync = false
      
    }
    if(localStorage.getItem("btn_Celo") !== undefined){
      this.btn_Celo = true
      this.nosync = false
      
    }
    if(localStorage.getItem("btn_Palpacion") !== undefined){
      this.btn_Palpacion = true
      this.nosync = false
      
    }

    if(localStorage.getItem("nosync") !== undefined){
      this.nosync = true


      this.btn_Palpacion = false
      this.btn_Celo = false
      this.btn_Servicios = false
      this.btn_Partos = false
    }
  }

  constructor(private router: Router) {}

  navigateTo(page) {
    this.router.navigateByUrl(page);
  }

}
