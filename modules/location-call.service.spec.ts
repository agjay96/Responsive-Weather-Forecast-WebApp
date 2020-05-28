import { TestBed } from '@angular/core/testing';

import { LocationCallService } from './location-call.service';

describe('LocationCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationCallService = TestBed.get(LocationCallService);
    expect(service).toBeTruthy();
  });
});
