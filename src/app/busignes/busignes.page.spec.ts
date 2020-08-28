import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusignesPage } from './busignes.page';

describe('BusignesPage', () => {
  let component: BusignesPage;
  let fixture: ComponentFixture<BusignesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusignesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusignesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
