import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SustitucionesPage } from './sustituciones.page';

describe('SustitucionesPage', () => {
  let component: SustitucionesPage;
  let fixture: ComponentFixture<SustitucionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SustitucionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SustitucionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
