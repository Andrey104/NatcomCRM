import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealPaymentsComponent } from './deal-payments.component';

describe('DealPaymentsComponent', () => {
  let component: DealPaymentsComponent;
  let fixture: ComponentFixture<DealPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
