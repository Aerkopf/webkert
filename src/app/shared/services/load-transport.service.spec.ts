import { TestBed } from '@angular/core/testing';

import { LoadTransportService } from './load-transport.service';

describe('LoadTransportService', () => {
  let service: LoadTransportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadTransportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
