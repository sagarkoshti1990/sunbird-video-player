import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
      if(event.type === 'volumechange') {
        this.viewerService.raiseHeartBeatEvent('VOLUME_CHANGE');
      }
      if(event.type === 'seeking') {
        this.viewerService.raiseHeartBeatEvent('DRAG');
      }
      if(event.type === 'seeking') {
        this.viewerService.raiseHeartBeatEvent('DRAG');
      }
      if(event.type === 'ratechange') {
        this.viewerService.raiseHeartBeatEvent('RATE_CHANGE');
      }
      this.cdr.detectChanges();
    })
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
    if(event === "SHARE") {
      this.viewerService.raiseHeartBeatEvent('SHARE');
    }
    if(event === "DOWNLOAD_MENU") {
      this.viewerService.raiseHeartBeatEvent('DOWNLOAD_MENU');
    }
    if(event === "EXIT") {
      this.viewerService.raiseHeartBeatEvent('EXIT');
    }
    if(event === "CLOSE_MENU") {
      this.viewerService.raiseHeartBeatEvent('CLOSE_MENU');
    }
  }

  replayContent(event) {
    this.playerEvent.emit(event);
    this.viewState = 'player';
    this.viewerService.raiseHeartBeatEvent('REPLAY');
  }


  downloadVideo() {
    var a = document.createElement("a");
    a.href = this.viewerService.src;
    a.download = this.viewerService.contentName;
    a.click();
    this.viewerService.raiseHeartBeatEvent('DOWNLOAD');
  }
}
