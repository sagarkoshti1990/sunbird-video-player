import { TestBed } from '@angular/core/testing';

import { SunbirdVideoPlayerService } from './sunbird-video-player.service';
import { CsTelemetryModule } from '@project-sunbird/client-services/telemetry';
import { mockData } from './services/viewer.service.spec.data';

describe('SunbirdVideoPlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service = TestBed.inject(SunbirdVideoPlayerService);
    expect(service).toBeTruthy();
  });
  it('should initialize player config', () => {
    const service = TestBed.inject(SunbirdVideoPlayerService);
    service.initialize(mockData.playerConfig);
    expect(CsTelemetryModule.instance.isInitialised).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    expect(service['telemetryObject']).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    expect(service['context']).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    expect(service['config']).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    expect(service['playSessionId']).toBeDefined();
  });
  it('should raise start telemetry event', () => {
    const service = TestBed.inject(SunbirdVideoPlayerService);
    spyOn(CsTelemetryModule.instance.telemetryService, 'raiseStartTelemetry').and.callFake(() => 'true');
    // eslint-disable-next-line @typescript-eslint/dot-notation
    service['context'] = {
      channel: '12345'
       };
    service.start(1234);
    expect(CsTelemetryModule.instance.telemetryService.raiseStartTelemetry).toHaveBeenCalled();
  });
  it('should raise end telemetry event', () => {
    const service = TestBed.inject(SunbirdVideoPlayerService);
    service.initialize(mockData.playerConfig);
    spyOn(CsTelemetryModule.instance.telemetryService, 'raiseEndTelemetry');
    service.end(10, 5, 10, 5, 3, 4, 5, 10);
    expect(CsTelemetryModule.instance.telemetryService.raiseEndTelemetry).toHaveBeenCalled();
  });
  it('should raise interact telemetry event', () => {
    const service = TestBed.inject(SunbirdVideoPlayerService);
    service.initialize(mockData.playerConfig);
    spyOn(CsTelemetryModule.instance.telemetryService, 'raiseInteractTelemetry');
    service.interact('pageId', 1);
    expect(CsTelemetryModule.instance.telemetryService.raiseInteractTelemetry).toHaveBeenCalled();
  });

  it('should raise heartBeat telemetry event', () => {
    const service = TestBed.inject(SunbirdVideoPlayerService);
    service.initialize(mockData.playerConfig);
    spyOn(CsTelemetryModule.instance.playerTelemetryService, 'onHeartBeatEvent');
    service.heartBeat({});
    expect(CsTelemetryModule.instance.playerTelemetryService.onHeartBeatEvent).toHaveBeenCalled();
  });

  it('should raise impression telemetry event', () => {
    const service = TestBed.inject(SunbirdVideoPlayerService);
    service.initialize(mockData.playerConfig);
    spyOn(CsTelemetryModule.instance.telemetryService, 'raiseImpressionTelemetry');
    service.impression(1);
    expect(CsTelemetryModule.instance.telemetryService.raiseImpressionTelemetry).toHaveBeenCalled();
  });

  it('should raise error telemetry event', () => {
    const service = TestBed.inject(SunbirdVideoPlayerService);
    service.initialize(mockData.playerConfig);
    spyOn(CsTelemetryModule.instance.telemetryService, 'raiseErrorTelemetry');
    service.error('123', 'abc');
    expect(CsTelemetryModule.instance.telemetryService.raiseErrorTelemetry).toHaveBeenCalled();
  });
});
