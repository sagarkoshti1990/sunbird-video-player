import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { VideoPlayerComponent } from './video-player.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ViewerService } from '../../services/viewer.service';
import { SunbirdVideoPlayerService } from '../../sunbird-video-player.service';
import { QuestionCursor } from '@project-sunbird/sunbird-quml-player-v9';
import { QuestionCursorImplementationService } from 'src/app/question-cursor-implementation.service';
describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [VideoPlayerComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ViewerService, SunbirdVideoPlayerService,
        { provide: QuestionCursor, useClass: QuestionCursorImplementationService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call pause()', () => {
    spyOn(component, 'toggleForwardRewindButton').and.callFake(() => 'true');
    spyOn(component.viewerService, 'raiseHeartBeatEvent').and.callFake(() => 'true');
    component.player = {
      pause: jasmine.createSpy('pause')
    };
    component.pause();
    expect(component.showPauseButton).toBeFalsy();
    expect(component.showPlayButton).toBeTruthy();
    expect(component.currentPlayerState).toEqual('pause');
    expect(component.toggleForwardRewindButton).toHaveBeenCalled();
    expect(component.viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('PAUSE');
    expect(component.player.pause).toHaveBeenCalled();
  });
  it('should call play()', () => {
    spyOn(component, 'toggleForwardRewindButton').and.callFake(() => 'true');
    component.player = {
      play: jasmine.createSpy('play')
    };
    component.play();
    expect(component.showPauseButton).toBeTruthy();
    expect(component.showPlayButton).toBeFalsy();
    expect(component.currentPlayerState).toEqual('play');
    expect(component.toggleForwardRewindButton).toHaveBeenCalled();
    expect(component.player.play).toHaveBeenCalled();
  });
  it('should call backward()', () => {
    spyOn(component, 'toggleForwardRewindButton').and.callFake(() => 'true');
    spyOn(component.viewerService, 'raiseHeartBeatEvent').and.callFake(() => 'true');
    component.backward();
    expect(component.toggleForwardRewindButton).toHaveBeenCalled();
    expect(component.viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('BACKWARD');
  });
  it('should call backward()', () => {
    spyOn(component, 'toggleForwardRewindButton').and.callFake(() => 'true');
    spyOn(component.viewerService, 'raiseHeartBeatEvent').and.callFake(() =>  'true');
    component.forward();
    expect(component.toggleForwardRewindButton).toHaveBeenCalled();
    expect(component.viewerService.raiseHeartBeatEvent).toHaveBeenCalledWith('FORWARD');
  });
  it('should call handleVideoControls', () => {
    component.player = {
      currentTime: jasmine.createSpy('currentTime')
    };
    spyOn(component, 'updatePlayerEventsMetadata').and.callFake(() =>  'true');
    component.totalSpentTime = 0;
    component.startTime = 0;
    component.handleVideoControls({type: 'ended'});
    expect(component.totalSpentTime).toString();
    expect(component.viewerService.visitedLength).toEqual(component.totalSpentTime);
  });
});

