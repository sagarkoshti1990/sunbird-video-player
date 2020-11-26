import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output,
  HostListener, ElementRef, ViewChild, AfterViewInit, Renderer2, OnDestroy } from '@angular/core';
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
  @Output() telemetryEvent: EventEmitter<any> =  new EventEmitter<any>();
  @ViewChild('videoPlayer') videoPlayerRef: ElementRef;
  viewState = 'player';
  showControls = true;
  sideMenuConfig = {
    showShare: true,
    showDownload: true,
    showReplay: true,
    showExit: true
  };
  options;
  private unlistenMouseEnter: () => void;
  private unlistenMouseLeave: () => void;

  constructor(public videoPlayerService: SunbirdVideoPlayerService,
    public viewerService: ViewerService, public cdr: ChangeDetectorRef, private renderer2: Renderer2) {
    this.playerEvent = this.viewerService.playerEvent;
    this.viewerService.playerEvent.subscribe(event => {
      if(event.type === 'loadstart') {
        this.viewerService.raiseStartEvent(event);
      } 
      if(event.type === 'ended') {
        this.viewerService.endPageSeen = true;
        this.viewerService.raiseEndEvent();
        this.viewState = 'end';
      }  
      if(event.type === 'error') {
        this.viewerService.raiseErrorEvent(event);
      }
      const events = [{ type: 'volumechange', telemetryEvent: 'VOLUME_CHANGE'}, { type: 'seeking', telemetryEvent: 'DRAG'},
      { type: 'ratechange', telemetryEvent: 'RATE_CHANGE'}];
      events.forEach(data => {
        if (event.type === data.type) {
          this.viewerService.raiseHeartBeatEvent(data.telemetryEvent);
        }
      });
    })
   }

  @HostListener('document:TelemetryEvent', ['$event'])
  onTelemetryEvent(event) {
    this.telemetryEvent.emit(event.detail);
  }

  ngOnInit() {
    this.videoPlayerService.initialize(this.playerConfig);
    this.viewerService.initialize(this.playerConfig);
    this.options = {
      sources: [
        {
          src: this.viewerService.src,
          type: this.viewerService.mimeType
        }
      ]
    }
  }

  sidebarMenuEvent(event) {
    this.viewerService.sidebarMenuEvent.emit(event);
  }

  ngAfterViewInit() {
    const videoPlayerElement = this.videoPlayerRef.nativeElement;
    this.unlistenMouseEnter = this.renderer2.listen(videoPlayerElement, 'mouseenter', () => {
      this.showControls = true;
    });

    this.unlistenMouseLeave = this.renderer2.listen(videoPlayerElement, 'mouseleave', () => {
      this.showControls = false;
    });
  }
    
  sideBarEvents(event) {
    this.playerEvent.emit(event);
    if(event === "DOWNLOAD") {
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

  replayContent(event) {
    this.playerEvent.emit(event);
    this.viewState = 'player';
    this.viewerService.raiseHeartBeatEvent('REPLAY');
  }


  downloadVideo() {
    var a = document.createElement("a");
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
    this.unlistenMouseEnter();
    this.unlistenMouseLeave();
  }
}
