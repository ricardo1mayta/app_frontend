import { TestBed } from '@angular/core/testing';

import { CreditoscomprasService } from './creditoscompras.service';

describe('CreditoscomprasService', () => {
  let service: CreditoscomprasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditoscomprasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
