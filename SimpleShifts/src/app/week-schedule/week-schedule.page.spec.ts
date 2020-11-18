import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WeekSchedulePage } from './week-schedule.page';

describe('WeekSchedulePage', () => {
  let component: WeekSchedulePage;
  let fixture: ComponentFixture<WeekSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekSchedulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeekSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
