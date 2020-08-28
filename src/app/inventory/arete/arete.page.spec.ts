import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AretePage } from './arete.page';

describe('AretePage', () => {
  let component: AretePage;
  let fixture: ComponentFixture<AretePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AretePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AretePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
