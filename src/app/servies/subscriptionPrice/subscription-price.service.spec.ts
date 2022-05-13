import { TestBed } from '@angular/core/testing';

import { SubscriptionPriceService } from './subscription-price.service';

describe('SubscriptionPriceService', () => {
  let service: SubscriptionPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
