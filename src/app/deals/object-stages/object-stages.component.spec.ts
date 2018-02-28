import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectStagesComponent } from './object-stages.component';

describe('ObjectStagesComponent', () => {
  let component: ObjectStagesComponent;
  let fixture: ComponentFixture<ObjectStagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectStagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
