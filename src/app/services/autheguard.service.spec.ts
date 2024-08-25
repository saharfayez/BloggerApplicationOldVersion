import { TestBed } from '@angular/core/testing';

import { AutheguardService } from './autheguard.service';

describe('AutheguardService', () => {
  let service: AutheguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutheguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
