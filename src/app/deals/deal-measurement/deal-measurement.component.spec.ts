import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealMeasurementComponent } from './deal-measurement.component';

describe('DealMeasurementComponent', () => {
  let component: DealMeasurementComponent;
  let fixture: ComponentFixture<DealMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
