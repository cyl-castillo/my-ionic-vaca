import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalSustitucionesPage } from './modal-sustituciones.page';

describe('ModalSustitucionesPage', () => {
  let component: ModalSustitucionesPage;
  let fixture: ComponentFixture<ModalSustitucionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSustitucionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSustitucionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
