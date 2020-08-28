import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConexionExitosaPage } from './conexion-exitosa.page';

describe('ConexionExitosaPage', () => {
  let component: ConexionExitosaPage;
  let fixture: ComponentFixture<ConexionExitosaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConexionExitosaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConexionExitosaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
