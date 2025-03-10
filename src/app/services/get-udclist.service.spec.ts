import { TestBed } from '@angular/core/testing';

import { GetUdclistService } from './get-udclist.service';

describe('GetUdclistService', () => {
  let service: GetUdclistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUdclistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
