import { TestBed } from '@angular/core/testing';
import { SgeService } from './sge.service';

describe('SgeService', () => {
  let service: SgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
