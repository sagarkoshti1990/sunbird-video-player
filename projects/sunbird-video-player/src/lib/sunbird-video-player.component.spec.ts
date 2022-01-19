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
  let timerCallback;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ SunbirdVideoPlayerComponent ],
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
    timerCallback = jasmine.createSpy('timerCallback');
    jasmine.clock().uninstall();
    jasmine.clock().install();
    // fixture.detectChanges();
  });

  // tslint:disable-next-line:only-arrow-functions
  afterEach(function() {
    jasmine.clock().uninstall();
  });
  it('should create SunbirdVideoPlayerComponent', () => {
    expect(component).toBeTruthy();
  });
  // xit('should initialize player config and log event when offline', () => {
  //   component.QumlPlayerConfig.config.sideMenu.enable = false;
  //   const sunbirdVideoPlayerService = TestBed.get(SunbirdVideoPlayerService);
  //   const viewerService = TestBed.get(ViewerService);
  //   const errorService = TestBed.get(ErrorService);
  //   spyOn(sunbirdVideoPlayerService, 'initialize');
  //   spyOn(viewerService, 'initialize');
  //   spyOn(viewerService, 'raiseExceptionLog');
  //   errorService.getInternetConnectivityError.emit({ error: 'test' });
  //   component.ngOnInit();
  //   expect(component.viewState).toEqual('player');
  //   expect(sunbirdVideoPlayerService.initialize).toHaveBeenCalled();
  //   expect(viewerService.initialize).toHaveBeenCalled();
  // });

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
  xit('should call questionSetData and assign QumlPlayerConfig', () => {
    const data = {response: {}, time: 1234, identifier: 2344};
    component.questionSetData(data);
    expect(component.QumlPlayerConfig.metadata).toEqual({});
    expect(component.currentInterceptionTime).toEqual(1234);
    expect(component.currentInterceptionUIId).toEqual(2344);
    expect(component.showQumlPlayer).toBeTruthy();
  });
  it('should call exitContent and emit player event', () => {
    const event = {};
    spyOn(component.playerEvent, 'emit').and.callThrough();
    spyOn(component.viewerService, 'raiseHeartBeatEvent').and.callFake(() => { });
    component.exitContent(event);
    expect(component.playerEvent.emit).toHaveBeenCalledWith({});
    expect(component.viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('EXIT');
  });
  it('should call replayContent and emit player event for REPLAY raiseHeartBeatEvent', () => {
    const event = {};
    spyOn(component.playerEvent, 'emit').and.callThrough();
    spyOn(component.viewerService, 'raiseHeartBeatEvent').and.callFake(() => { });
    component.replayContent(event);
    expect(component.playerEvent.emit).toHaveBeenCalledWith({});
    expect(component.viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('REPLAY');
    expect(component.viewState).toEqual('player');
    expect(component.viewerService.isEndEventRaised).toBeFalsy();
  });
  it('should call playContent and call raiseHeartBeatEvent ', () => {
    const event = {type: 'PLAY'};
    spyOn(component.viewerService, 'raiseHeartBeatEvent').and.callFake(() => { });
    component.playContent(event);
    expect(component.viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('PLAY');
  });
});
