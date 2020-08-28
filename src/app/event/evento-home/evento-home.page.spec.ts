import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventoHomePage } from './evento-home.page';

describe('EventoHomePage', () => {
  let component: EventoHomePage;
  let fixture: ComponentFixture<EventoHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventoHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
