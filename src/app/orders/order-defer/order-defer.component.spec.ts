import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeferComponent } from './order-defer.component';

describe('OrderDeferComponent', () => {
  let component: OrderDeferComponent;
  let fixture: ComponentFixture<OrderDeferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDeferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDeferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
