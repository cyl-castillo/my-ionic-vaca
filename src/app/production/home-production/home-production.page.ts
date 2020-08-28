import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-production',
  templateUrl: './home-production.page.html',
  styleUrls: ['./home-production.page.scss'],
})
export class HomeProductionPage implements OnInit {
  btn_produccion = false;
  nosync = false;

  constructor(private router: Router) {}

  navigateTo(page) {
    this.router.navigateByUrl(page);
  }

  ngOnInit() {
    if(localStorage.getItem("btn_produccion") !== undefined){
      this.btn_produccion = true
      this.nosync = false
    }

    if(localStorage.getItem("nosync") !== undefined){
      this.nosync = true
      this.btn_produccion = false
    }
  }

}
