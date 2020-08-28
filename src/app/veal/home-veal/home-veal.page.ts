import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-veal',
  templateUrl: './home-veal.page.html',
  styleUrls: ['./home-veal.page.scss'],
})
export class HomeVealPage implements OnInit {

  btn_Historico_Terneras = false
  nosync = false;
  constructor(private router: Router) {}

  navigateTo(page) {
    this.router.navigateByUrl(page);
  }

  ngOnInit() {
    if(localStorage.getItem("btn_Historico_Terneras") !== undefined){
      this.btn_Historico_Terneras = true
      this.nosync = false
    }
    if(localStorage.getItem("nosync") !== undefined){
      this.nosync = true
      this.btn_Historico_Terneras = false
    }
  }

}
