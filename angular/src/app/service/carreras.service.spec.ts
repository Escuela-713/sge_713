import { TestBed } from '@angular/core/testing';

import { CarrerasService } from './carreras.service';

describe('CarrerasService', () => {
  let service: CarrerasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrerasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
