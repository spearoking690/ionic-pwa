import { TestBed } from '@angular/core/testing';

import { GetaddresslistService } from './getaddresslist.service';

describe('GetaddresslistService', () => {
  let service: GetaddresslistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetaddresslistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
