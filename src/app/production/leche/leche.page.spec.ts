import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LechePage } from './leche.page';

describe('LechePage', () => {
  let component: LechePage;
  let fixture: ComponentFixture<LechePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LechePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LechePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
