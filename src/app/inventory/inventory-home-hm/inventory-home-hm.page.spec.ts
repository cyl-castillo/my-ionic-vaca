import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InventoryHomeHmPage } from './inventory-home-hm.page';

describe('InventoryHomeHmPage', () => {
  let component: InventoryHomeHmPage;
  let fixture: ComponentFixture<InventoryHomeHmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryHomeHmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryHomeHmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
