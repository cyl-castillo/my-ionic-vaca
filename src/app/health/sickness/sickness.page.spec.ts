import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SicknessPage } from './sickness.page';

describe('SicknessPage', () => {
  let component: SicknessPage;
  let fixture: ComponentFixture<SicknessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SicknessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SicknessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
