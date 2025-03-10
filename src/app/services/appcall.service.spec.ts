import { TestBed } from '@angular/core/testing';

import { AppcallService } from './appcall.service';

describe('AppcallService', () => {
  let service: AppcallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppcallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
