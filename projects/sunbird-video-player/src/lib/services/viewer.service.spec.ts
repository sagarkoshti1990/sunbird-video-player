import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ViewerService } from './viewer.service';
import { SunbirdVideoPlayerService } from '../sunbird-video-player.service';
import { QuestionCursor } from '@project-sunbird/sunbird-quml-player-v9';
import { QuestionCursorImplementationService } from 'src/app/question-cursor-implementation.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('ViewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [ViewerService, SunbirdVideoPlayerService,
      { provide: QuestionCursor, useClass: QuestionCursorImplementationService }]
  }));

  it('should be created ViewerService', () => {
    const service = TestBed.inject(ViewerService);
    expect(service).toBeTruthy();
  });
  it('should call raiseExceptionLog', () => {
    const service = TestBed.inject(ViewerService);
    spyOn(service.playerEvent, 'emit').and.callThrough();
    spyOn(service['videoPlayerService'], 'error').and.callFake(() => 'true');
    const exceptionLogEvent = {
      eid: 'ERROR',
      edata: {
        err: 'errorCode',
        errtype: 'errorType',
        requestid: 'traceId',
        stacktrace: 'stacktrace',
      }
    };
    service.raiseExceptionLog(exceptionLogEvent.edata.err,
      exceptionLogEvent.edata.errtype, exceptionLogEvent.edata.stacktrace, exceptionLogEvent.edata.requestid);
    expect(service.playerEvent.emit).toHaveBeenCalledWith(exceptionLogEvent);
    expect(service['videoPlayerService']['error']).toHaveBeenCalledWith(exceptionLogEvent.edata.err,
      exceptionLogEvent.edata.errtype, exceptionLogEvent.edata.stacktrace);
  });
  it('should call raiseHeartBeatEvent for REPLAY', () => {
    const service = TestBed.inject(ViewerService);
    spyOn(service.playerEvent, 'emit').and.callThrough();
    spyOn(service['videoPlayerService'], 'heartBeat').and.callFake(() => 'true');
    spyOn(service['videoPlayerService'], 'interact').and.callFake(() => 'true');
    service.raiseHeartBeatEvent('REPLAY');
    expect(service.showScore).toBeFalsy();
    expect(service.scoreObtained).toEqual(0);
    expect(service.interceptionResponses).toEqual({});
  });
});
