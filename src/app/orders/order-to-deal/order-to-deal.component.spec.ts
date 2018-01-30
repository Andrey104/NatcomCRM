import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderToDealComponent } from './order-to-deal.component';

describe('OrderToDealComponent', () => {
  let component: OrderToDealComponent;
  let fixture: ComponentFixture<OrderToDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderToDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderToDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
