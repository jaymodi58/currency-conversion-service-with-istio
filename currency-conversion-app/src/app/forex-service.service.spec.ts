import { TestBed, inject } from '@angular/core/testing';

import { ForexServiceService } from './forex-service.service';

describe('ForexServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForexServiceService]
    });
  });

  it('should be created', inject([ForexServiceService], (service: ForexServiceService) => {
    expect(service).toBeTruthy();
  }));
});
