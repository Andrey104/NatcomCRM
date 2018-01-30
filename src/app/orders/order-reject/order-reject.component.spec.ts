import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRejectComponent } from './order-reject.component';

describe('OrderRejectComponent', () => {
  let component: OrderRejectComponent;
  let fixture: ComponentFixture<OrderRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
