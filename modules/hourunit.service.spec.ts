import { TestBed } from '@angular/core/testing';

import { HourunitService } from './mission.service';

describe('HourunitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HourunitService = TestBed.get(HourunitService);
    expect(service).toBeTruthy();
  });
});
