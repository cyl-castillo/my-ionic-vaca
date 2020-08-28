import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BirthCompletePage } from './birth-complete.page';

describe('BirthCompletePage', () => {
  let component: BirthCompletePage;
  let fixture: ComponentFixture<BirthCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthCompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BirthCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
