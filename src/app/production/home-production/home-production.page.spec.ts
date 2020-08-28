import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeProductionPage } from './home-production.page';

describe('HomeProductionPage', () => {
  let component: HomeProductionPage;
  let fixture: ComponentFixture<HomeProductionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProductionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeProductionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
