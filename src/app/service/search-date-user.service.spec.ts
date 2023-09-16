import { TestBed } from '@angular/core/testing';

import { SearchDateUserService } from './search-date-user.service';

describe('SearchDateUserService', () => {
  let service: SearchDateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchDateUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
