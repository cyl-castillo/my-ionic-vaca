import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchAnimalCodigoPage } from './search-animal-codigo.page';

describe('SearchAnimalCodigoPage', () => {
  let component: SearchAnimalCodigoPage;
  let fixture: ComponentFixture<SearchAnimalCodigoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAnimalCodigoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAnimalCodigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
