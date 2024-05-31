import { TestBed } from '@angular/core/testing';

import { PlanesService } from './planes.service';

describe('PlanesService', () => {
  let service: PlanesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
