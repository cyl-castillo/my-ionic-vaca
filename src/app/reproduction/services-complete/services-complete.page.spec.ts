import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicesCompletePage } from './services-complete.page';

describe('ServicesCompletePage', () => {
  let component: ServicesCompletePage;
  let fixture: ComponentFixture<ServicesCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesCompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
