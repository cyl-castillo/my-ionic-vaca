import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeReproductionPage } from './home-reproduction.page';

describe('HomeReproductionPage', () => {
  let component: HomeReproductionPage;
  let fixture: ComponentFixture<HomeReproductionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeReproductionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeReproductionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
