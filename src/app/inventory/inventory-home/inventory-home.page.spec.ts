import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InventoryHomePage } from './inventory-home.page';

describe('InventoryHomePage', () => {
  let component: InventoryHomePage;
  let fixture: ComponentFixture<InventoryHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
