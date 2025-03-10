import { TestBed } from '@angular/core/testing';

import { GetBUListService } from './get-bulist.service';

describe('GetBUListService', () => {
  let service: GetBUListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBUListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
