import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalEventPage } from './modal-event.page';

describe('ModalEventPage', () => {
  let component: ModalEventPage;
  let fixture: ComponentFixture<ModalEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
