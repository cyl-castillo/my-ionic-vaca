import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CelosPage } from './celos.page';

describe('CelosPage', () => {
  let component: CelosPage;
  let fixture: ComponentFixture<CelosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CelosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
