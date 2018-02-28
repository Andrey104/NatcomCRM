import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealMountComponent } from './deal-mount.component';

describe('DealMountComponent', () => {
  let component: DealMountComponent;
  let fixture: ComponentFixture<DealMountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealMountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealMountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
