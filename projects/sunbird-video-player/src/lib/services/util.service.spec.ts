import { TestBed } from '@angular/core/testing';

import { UtilService } from './util.service';

describe('UtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created UtilService', () => {
    const service = TestBed.inject(UtilService);
    expect(service).toBeTruthy();
  });
  it('should call getTimeSpentText', () => {
    const service = TestBed.inject(UtilService);
    const timeFormat = service.getTimeSpentText(61);
    expect(timeFormat).toEqual('0:00');
  });
  it('should call uniqueId', () => {
    const service = TestBed.inject(UtilService);
    const timeFormat = service.uniqueId(6);
    expect(timeFormat).not.toEqual('qIocVf');
  });
});
