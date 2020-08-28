import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnimalHistoricalPage } from './animal-historical.page';

describe('AnimalHistoricalPage', () => {
  let component: AnimalHistoricalPage;
  let fixture: ComponentFixture<AnimalHistoricalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalHistoricalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalHistoricalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
