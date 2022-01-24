import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SunbirdVideoPlayerComponent } from './sunbird-video-player.component';
import { SunbirdVideoPlayerService } from './sunbird-video-player.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ViewerService } from './services/viewer.service';
import { HttpClientModule } from '@angular/common/http';
import { mockData } from './sunbird-video-player.component.spec.data';
import { ErrorService } from '@project-sunbird/sunbird-player-sdk-v9';
import { QuestionCursor } from '@project-sunbird/sunbird-quml-player-v9';
import { QuestionCursorImplementationService } from 'src/app/question-cursor-implementation.service';

describe('SunbirdVideoPlayerComponent', () => {
  let component: SunbirdVideoPlayerComponent;
  let fixture: ComponentFixture<SunbirdVideoPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [SunbirdVideoPlayerComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ViewerService, SunbirdVideoPlayerService, ErrorService,
        { provide: QuestionCursor, useClass: QuestionCursorImplementationService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SunbirdVideoPlayerComponent);
    component = fixture.componentInstance;
    component.playerConfig = mockData.playerConfig;
    jasmine.clock().uninstall();
    jasmine.clock().install();
  });

  // tslint:disable-next-line:only-arrow-functions
  afterEach(function() {
    jasmine.clock().uninstall();
  });
  it('should create SunbirdVideoPlayerComponent', () => {
    expect(component).toBeTruthy();
  });
  it('show controls sould be false after mentioned time', () => {
    component.isPaused = false;
    setInterval(() => {
      if (!component.isPaused) {
        component.showControls = false;
      }
    }, 100);
    expect(component.showControls).toBeTruthy();
    jasmine.clock().tick(101);
    expect(component.showControls).toBeFalsy();
  });
  it('should call the playerInstance and define the videoInstance', () => {
    component.playerInstance({});
    expect(component.videoInstance).toEqual({});
  });
  it('should call exitContent and emit player event', () => {
    const event = {};
    spyOn(component.playerEvent, 'emit').and.callThrough();
    spyOn(component.viewerService, 'raiseHeartBeatEvent').and.callFake(() => 'true');
    component.exitContent(event);
    expect(component.playerEvent.emit).toHaveBeenCalledWith({});
    expect(component.viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('EXIT');
  });
  it('should call replayContent and emit player event for REPLAY raiseHeartBeatEvent', () => {
    const event = {};
    spyOn(component.playerEvent, 'emit').and.callThrough();
    spyOn(component.viewerService, 'raiseHeartBeatEvent').and.callFake(() => 'true');
    component.replayContent(event);
    expect(component.playerEvent.emit).toHaveBeenCalledWith({});
    expect(component.viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('REPLAY');
    expect(component.viewState).toEqual('player');
    expect(component.viewerService.isEndEventRaised).toBeFalsy();
  });
  it('should call playContent and call raiseHeartBeatEvent ', () => {
    const event = { type: 'PLAY' };
    spyOn(component.viewerService, 'raiseHeartBeatEvent').and.callFake(() => 'true');
    component.playContent(event);
    expect(component.viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('PLAY');
  });
  it('should call sideBarEvents and call download video', () => {
    const event = { type: 'DOWNLOAD', event: new MouseEvent('') };
    spyOn(component, 'downloadVideo').and.callFake(() => 'true');
    spyOn(component.viewerService.sidebarMenuEvent, 'emit').and.callThrough();
    spyOn(component.viewerService, 'raiseHeartBeatEvent').and.callFake(() => 'true');
    component.sideBarEvents(event);
    expect(component.downloadVideo).toHaveBeenCalled();
    expect(component.viewerService.raiseHeartBeatEvent).not.toHaveBeenCalledWith('DOWNLOAD');
    expect(component.viewerService.sidebarMenuEvent.emit).not.toHaveBeenCalledWith('CLOSE_MENU');
  });
  it('should call sideBarEvents and call raiseHeartBeatEvent for event EXIT', () => {
    const event = { type: 'EXIT', event: new MouseEvent('') };
    spyOn(component, 'downloadVideo').and.callFake(() => 'true');
    spyOn(component.viewerService.sidebarMenuEvent, 'emit').and.callThrough();
    spyOn(component.viewerService, 'raiseHeartBeatEvent').and.callFake(() => 'true');
    component.sideBarEvents(event);
    expect(component.downloadVideo).not.toHaveBeenCalled();
    expect(component.viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('EXIT');
    expect(component.viewerService.sidebarMenuEvent.emit).toHaveBeenCalledWith('CLOSE_MENU');
  });
  it('should call sideBarEvents and call raiseHeartBeatEvent for events share and etc', () => {
    const event = { type: 'SHARE', event: new MouseEvent('') };
    spyOn(component, 'downloadVideo').and.callFake(() => 'true');
    spyOn(component.viewerService.sidebarMenuEvent, 'emit').and.callThrough();
    spyOn(component.viewerService, 'raiseHeartBeatEvent').and.callFake(() => 'true');
    component.sideBarEvents(event);
    expect(component.downloadVideo).not.toHaveBeenCalled();
    expect(component.viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('SHARE');
    expect(component.viewerService.sidebarMenuEvent.emit).not.toHaveBeenCalledWith('CLOSE_MENU');
  });
  it('should call downloadVideo ', () => {
    spyOn(component.viewerService, 'raiseHeartBeatEvent').and.callFake(() => 'true');
    component.downloadVideo();
    expect(component.viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('DOWNLOAD');
  });
  it('should call onTelemetryEvent', () => {
    spyOn(component.telemetryEvent, 'emit').and.callThrough();
    const event = { detail: 'asdf' };
    component.onTelemetryEvent(event);
    expect(component.telemetryEvent.emit).toHaveBeenCalledWith(event.detail);
  });
  it('should call setTelemetryObjectRollup', () => {
    component.QumlPlayerConfig = mockData.playerConfig;
    component.setTelemetryObjectRollup(1234);
    expect(component.QumlPlayerConfig.context).toBeDefined();
  });
  it('should call ngOnInit', () => {
    spyOn(component.videoPlayerService, 'initialize').and.callThrough();
    spyOn(component.viewerService, 'initialize').and.callThrough();
    spyOn(component, 'setTelemetryObjectRollup').and.callThrough();
    component.ngOnInit();
    expect(component.viewerService.initialize).toHaveBeenCalledWith(component.playerConfig);
    expect(component.videoPlayerService.initialize).toHaveBeenCalledWith(component.playerConfig);
    expect(component.setTelemetryObjectRollup).toHaveBeenCalledWith(component.playerConfig.metadata.identifier);
    expect(component.playerConfig).toBeDefined();
    expect(component.QumlPlayerConfig).toBeDefined();
    expect(component.QumlPlayerConfig.config).toBeDefined();
    expect(component.QumlPlayerConfig.context).toBeDefined();
    expect(component.traceId).toEqual(component.playerConfig.config.traceId);
  });
});
