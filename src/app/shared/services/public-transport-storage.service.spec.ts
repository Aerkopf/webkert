import { TestBed } from '@angular/core/testing';

import { PublicTransportStorageService } from './public-transport-storage.service';

describe('PublicTransportStorageService', () => {
  let service: PublicTransportStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicTransportStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
