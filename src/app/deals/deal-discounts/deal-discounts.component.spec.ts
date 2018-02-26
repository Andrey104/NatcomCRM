import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealDiscountsComponent } from './deal-discounts.component';

describe('DealDiscountsComponent', () => {
  let component: DealDiscountsComponent;
  let fixture: ComponentFixture<DealDiscountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealDiscountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
