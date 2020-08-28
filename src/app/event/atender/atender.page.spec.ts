import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AtenderPage } from './atender.page';

describe('AtenderPage', () => {
  let component: AtenderPage;
  let fixture: ComponentFixture<AtenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtenderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AtenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
