import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SincronizacionHomePage } from './sincronizacion-home.page';

describe('SincronizacionHomePage', () => {
  let component: SincronizacionHomePage;
  let fixture: ComponentFixture<SincronizacionHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SincronizacionHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SincronizacionHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
