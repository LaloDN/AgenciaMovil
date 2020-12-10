import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CambioCochePage } from './cambio-coche.page';

describe('CambioCochePage', () => {
  let component: CambioCochePage;
  let fixture: ComponentFixture<CambioCochePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioCochePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CambioCochePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
