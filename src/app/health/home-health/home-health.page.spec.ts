import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeHealthPage } from './home-health.page';

describe('HomeHealthPage', () => {
  let component: HomeHealthPage;
  let fixture: ComponentFixture<HomeHealthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeHealthPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeHealthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
