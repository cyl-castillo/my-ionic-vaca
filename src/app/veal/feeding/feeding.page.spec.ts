import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedingPage } from './feeding.page';

describe('FeedingPage', () => {
  let component: FeedingPage;
  let fixture: ComponentFixture<FeedingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
