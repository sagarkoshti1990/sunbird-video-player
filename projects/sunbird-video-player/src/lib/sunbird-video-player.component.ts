import {
  ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output,
  HostListener, ElementRef, ViewChild, AfterViewInit, Renderer2, OnDestroy
} from '@angular/core';
import { ErrorService , errorCode , errorMessage } from '@project-sunbird/sunbird-player-sdk-v8';

import { PlayerConfig } from './playerInterfaces';
import { ViewerService } from './services/viewer.service';
import { SunbirdVideoPlayerService } from './sunbird-video-player.service';
@Component({
  selector: 'sunbird-video-player',
  templateUrl: './sunbird-video-player.component.html',
  styleUrls: ['./sunbird-video-player.component.scss']
})
export class SunbirdVideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() playerConfig: PlayerConfig;
  @Output() playerEvent: EventEmitter<object>;
  @Output() telemetryEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('videoPlayer', { static: true }) videoPlayerRef: ElementRef;
  viewState = 'player';
  public traceId: string;
  public nextContent: any;
  showControls = true;
  sideMenuConfig = {
    showShare: true,
    showDownload: true,
    showReplay: true,
    showExit: true
  };
  private unlistenTouchStart: () => void;
  private unlistenMouseMove: () => void;
  isPaused = false;

  constructor(
    public videoPlayerService: SunbirdVideoPlayerService,
    public viewerService: ViewerService,
    public cdr: ChangeDetectorRef,
    private renderer2: Renderer2,
    public errorService: ErrorService
  ) {
    this.playerEvent = this.viewerService.playerEvent;
    this.viewerService.playerEvent.subscribe(event => {
      if(event.type === 'pause') {
        this.isPaused = true;
        this.showControls = true;
      }
      if(event.type === 'play') {
        this.isPaused = false;
      }
      if (event.type === 'loadstart') {
        this.viewerService.raiseStartEvent(event);
      }
      if (event.type === 'ended') {
        this.viewerService.endPageSeen = true;
        this.viewerService.raiseEndEvent();
        this.viewState = 'end';
      }
      if (event.type === 'error') {
        this.viewerService.raiseErrorEvent(event);
        this.viewerService.raiseExceptionLog(errorCode.contentLoadFails, errorMessage.contentLoadFails, event, this.traceId);
      }
      const events = [{ type: 'volumechange', telemetryEvent: 'VOLUME_CHANGE' }, { type: 'seeking', telemetryEvent: 'DRAG' }, { type: 'fullscreen', telemetryEvent: 'FULLSCREEN' },
      { type: 'ratechange', telemetryEvent: 'RATE_CHANGE' }];
      events.forEach(data => {
        if (event.type === data.type) {
          this.viewerService.raiseHeartBeatEvent(data.telemetryEvent);
        }
      });
    });
  }

  @HostListener('document:TelemetryEvent', ['$event'])
  onTelemetryEvent(event) {
    this.telemetryEvent.emit(event.detail);
  }

  ngOnInit() {
    setInterval(() => {
      if (!this.isPaused) {
        this.showControls = false;
      }
    }, 5000);

    /* tslint:disable:no-string-literal */
    this.nextContent = this.playerConfig.config.nextContent;
    this.traceId = this.playerConfig.config['traceId'];
    // Log event when internet is not available
    this.errorService.getInternetConnectivityError.subscribe(event => {
      this.viewerService.raiseExceptionLog(errorCode.internetConnectivity, errorMessage.internetConnectivity, event['error'], this.traceId);
    });

    const contentCompabilityLevel = this.playerConfig.metadata['compatibilityLevel'];
    if (contentCompabilityLevel) {
      const checkContentCompatible = this.errorService.checkContentCompatibility(contentCompabilityLevel);
      if (!checkContentCompatible['isCompitable']) {
        this.viewerService.raiseErrorEvent(checkContentCompatible['error'], 'compatibility-error');
        this.viewerService.raiseExceptionLog(errorCode.contentCompatibility,
          errorMessage.contentCompatibility, checkContentCompatible['error'], this.traceId);
      }
    }
    this.sideMenuConfig = { ...this.sideMenuConfig, ...this.playerConfig.config.sideMenu };
    this.videoPlayerService.initialize(this.playerConfig);
    this.viewerService.initialize(this.playerConfig);
  }

  sidebarMenuEvent(event) {
    this.viewerService.sidebarMenuEvent.emit(event);
  }

  ngAfterViewInit() {
    const videoPlayerElement = this.videoPlayerRef.nativeElement;
    this.unlistenMouseMove = this.renderer2.listen(videoPlayerElement, 'mousemove', () => {
      this.showControls = true;
    });

    this.unlistenTouchStart = this.renderer2.listen(videoPlayerElement, 'touchstart', () => {
      this.showControls = true;
    });
  }

  sideBarEvents(event) {
    this.playerEvent.emit(event);
    if (event === 'DOWNLOAD') {
      this.downloadVideo();
    }
    const events = ['SHARE', 'DOWNLOAD_MENU', 'EXIT', 'CLOSE_MENU'];
    events.forEach(data => {
      if (event === data) {
        this.viewerService.raiseHeartBeatEvent(data);
      }
      if (event === 'EXIT') {
        this.viewerService.sidebarMenuEvent.emit('CLOSE_MENU');
      }
    });
  }

  playContent(event){
    this.viewerService.raiseHeartBeatEvent(event.type);
  }

  replayContent(event) {
    this.playerEvent.emit(event);
    this.viewState = 'player';
    this.viewerService.raiseHeartBeatEvent('REPLAY');
  }

  exitContent(event) {
    this.playerEvent.emit(event);
    this.viewerService.raiseHeartBeatEvent('EXIT');
  }

  downloadVideo() {
    const a = document.createElement('a');
    a.href = this.viewerService.artifactUrl;
    a.download = this.viewerService.contentName;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.remove();
    this.viewerService.raiseHeartBeatEvent('DOWNLOAD');
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this.viewerService.raiseEndEvent();
    this.unlistenTouchStart();
    this.unlistenMouseMove();
  }
}
