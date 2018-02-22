import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementCardComponent } from './measurement-card.component';

describe('MeasurementCardComponent', () => {
  let component: MeasurementCardComponent;
  let fixture: ComponentFixture<MeasurementCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
