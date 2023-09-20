import { TestBed } from '@angular/core/testing';

import { DynamicHomeService } from './dynamic-home.service';

describe('DynamicHomeService', () => {
  let service: DynamicHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
