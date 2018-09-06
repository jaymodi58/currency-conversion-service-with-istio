import { TestBed, inject } from '@angular/core/testing';

import { CurrencyConversionService } from './currency-conversion.service';

describe('CurrencyConversionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyConversionService]
    });
  });

  it('should be created', inject([CurrencyConversionService], (service: CurrencyConversionService) => {
    expect(service).toBeTruthy();
  }));
});
