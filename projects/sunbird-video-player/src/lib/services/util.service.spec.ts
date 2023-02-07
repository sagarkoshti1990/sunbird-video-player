import { TestBed } from '@angular/core/testing';

import { UtilService } from './util.service';

describe('UtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created UtilService', () => {
    const service = TestBed.inject(UtilService);
    expect(service).toBeTruthy();
  });
  it('should call getTimeSpentText for 1 minute ', () => {
    const service = TestBed.inject(UtilService);
    const timeFormat = service.getTimeSpentText(60); // passing data in milli seconds
    expect(timeFormat).toEqual('1:00');
  });
  it('should call getTimeSpentText for 10 minute', () => {
    const service = TestBed.inject(UtilService);
    const timeFormat = service.getTimeSpentText(600); // passing data in milli seconds
    expect(timeFormat).toEqual('10:00');
  });
  it('should call uniqueId', () => {
    const service = TestBed.inject(UtilService);
    const timeFormat = service.uniqueId(6);
    expect(timeFormat).toString();
  });
});
