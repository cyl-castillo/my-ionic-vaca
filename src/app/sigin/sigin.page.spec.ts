import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SiginPage } from './sigin.page';

describe('SiginPage', () => {
  let component: SiginPage;
  let fixture: ComponentFixture<SiginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SiginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
