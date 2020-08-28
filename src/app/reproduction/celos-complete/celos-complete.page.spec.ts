import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CelosCompletePage } from './celos-complete.page';

describe('CelosCompletePage', () => {
  let component: CelosCompletePage;
  let fixture: ComponentFixture<CelosCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelosCompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CelosCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
