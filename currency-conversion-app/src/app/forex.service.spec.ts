import { TestBed, inject } from '@angular/core/testing';

import { ForexService } from './forex.service';

describe('ForexServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForexService]
    });
  });

  it('should be created', inject([ForexService], (service: ForexService) => {
    expect(service).toBeTruthy();
  }));
});
