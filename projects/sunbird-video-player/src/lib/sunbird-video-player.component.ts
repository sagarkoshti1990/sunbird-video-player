import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
import { PlayerConfig } from './playerInterfaces';
import { ViewerService } from './services/viewer.service';
import { SunbirdVideoPlayerService } from './sunbird-video-player.service';

@Component({
  selector: 'sunbird-video-player',
  templateUrl: './sunbird-video-player.component.html',
  styleUrls: ['./sunbird-video-player.component.scss']
})
export class SunbirdVideoPlayerComponent implements OnInit {

  @Input() playerConfig: PlayerConfig;
  @Output() playerEvent: EventEmitter<object>;
  @Output() telemetryEvent: EventEmitter<any> =  new EventEmitter<any>();
  viewState = 'player';
  showControls = true;
  sideMenuConfig = {
    showShare: true,
    showDownload: true,
    showReplay: true,
    showExit: true
  };
  options;

  constructor(public videoPlayerService: SunbirdVideoPlayerService,
    public viewerService: ViewerService, public cdr: ChangeDetectorRef) {
    this.playerEvent = this.viewerService.playerEvent;
    this.viewerService.playerEvent.subscribe(event => {
      if(event.type === 'loadstart') {
        this.viewerService.raiseStartEvent(event);
      } 
      if(event.type === 'ended') {
        this.viewerService.endPageSeen = true;
        this.viewerService.raiseEndEvent();
        this.viewState = 'end';
        this.showControls = true;
      }  
      if(event.type === 'pause') {
        this.showControls = true;
      } 
      if(event.type === 'playing') {
        this.showControls = false;
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
      this.cdr.detectChanges();
    })
   }

  @HostListener('document:telemetryEvent', ['$event'])
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
    
  sideBarEvents(event) {
    this.playerEvent.emit(event);
    if(event.type === "DOWNLOAD") {
      this.downloadVideo();
    }
    const events = ['SHARE', 'DOWNLOAD_MENU', 'EXIT', 'CLOSE_MENU'];
    events.forEach(data => {
      if (event === data) {
        this.viewerService.raiseHeartBeatEvent(data);
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
}
