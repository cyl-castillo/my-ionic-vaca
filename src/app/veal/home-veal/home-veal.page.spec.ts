import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeVealPage } from './home-veal.page';

describe('HomeVealPage', () => {
  let component: HomeVealPage;
  let fixture: ComponentFixture<HomeVealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeVealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeVealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
