import { TestBed, inject } from '@angular/core/testing';

import { MountService } from './mount.service';

describe('MountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MountService]
    });
  });

  it('should be created', inject([MountService], (service: MountService) => {
    expect(service).toBeTruthy();
  }));
});
