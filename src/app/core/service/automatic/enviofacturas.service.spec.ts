import { TestBed } from '@angular/core/testing';

import { EnviofacturasService } from './enviofacturas.service';

describe('EnviofacturasService', () => {
  let service: EnviofacturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviofacturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
