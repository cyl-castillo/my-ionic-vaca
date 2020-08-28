import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-health',
  templateUrl: './home-health.page.html',
  styleUrls: ['./home-health.page.scss'],
})
export class HomeHealthPage implements OnInit {
  btn_Enfermedades = true;
  btn_MedicionesFisicas = true;
  nosync = true;

  constructor(private router: Router) {}

  navigateTo(page) {
    this.router.navigateByUrl(page);
  }

  ngOnInit() {
    if(localStorage.getItem("btn_Enfermedades") !== undefined){
      this.btn_Enfermedades = JSON.parse(localStorage.getItem("btn_Enfermedades"))
      this.nosync = false

    }
    if(localStorage.getItem("btn_MedicionesFisicas") !== undefined){
      this.btn_MedicionesFisicas = JSON.parse(localStorage.getItem("btn_MedicionesFisicas"))
      this.nosync = false
      
    }
  }

}
