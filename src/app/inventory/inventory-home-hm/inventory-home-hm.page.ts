import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-home-hm',
  templateUrl: './inventory-home-hm.page.html',
  styleUrls: ['./inventory-home-hm.page.scss'],
})
export class InventoryHomeHmPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo(page) {
    this.router.navigateByUrl(page);
  }

}
