import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConexionPage } from './conexion.page';

describe('ConexionPage', () => {
  let component: ConexionPage;
  let fixture: ComponentFixture<ConexionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConexionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConexionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
