import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PalpacionCompletePage } from './palpacion-complete.page';

describe('PalpacionCompletePage', () => {
  let component: PalpacionCompletePage;
  let fixture: ComponentFixture<PalpacionCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalpacionCompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PalpacionCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
