import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RangoPage } from './rango.page';

describe('RangoPage', () => {
  let component: RangoPage;
  let fixture: ComponentFixture<RangoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RangoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
