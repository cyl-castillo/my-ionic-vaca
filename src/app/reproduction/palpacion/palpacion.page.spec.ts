import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PalpacionPage } from './palpacion.page';

describe('PalpacionPage', () => {
  let component: PalpacionPage;
  let fixture: ComponentFixture<PalpacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalpacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PalpacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
