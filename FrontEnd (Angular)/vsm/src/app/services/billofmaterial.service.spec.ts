import { TestBed } from '@angular/core/testing';

import { BillofmaterialService } from './billofmaterial.service';

describe('BillofmaterialService', () => {
  let service: BillofmaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillofmaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
