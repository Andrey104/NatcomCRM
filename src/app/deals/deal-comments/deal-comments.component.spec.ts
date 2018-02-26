import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealCommentsComponent } from './deal-comments.component';

describe('DealCommentsComponent', () => {
  let component: DealCommentsComponent;
  let fixture: ComponentFixture<DealCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
