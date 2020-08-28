import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeControlPage } from './home-control.page';

describe('HomeControlPage', () => {
  let component: HomeControlPage;
  let fixture: ComponentFixture<HomeControlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeControlPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeControlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
