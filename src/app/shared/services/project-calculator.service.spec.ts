import { TestBed } from '@angular/core/testing';

import { ProjectCalculatorService } from './project-calculator.service';

describe('ProjectCalculatorService', () => {
  let service: ProjectCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
