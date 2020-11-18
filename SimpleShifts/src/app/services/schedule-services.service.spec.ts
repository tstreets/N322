import { TestBed } from '@angular/core/testing';

import { ScheduleServicesService } from './schedule-services.service';

describe('ScheduleServicesService', () => {
  let service: ScheduleServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
