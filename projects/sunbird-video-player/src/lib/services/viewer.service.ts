import { EventEmitter, Injectable } from '@angular/core';
import { PlayerConfig } from '../playerInterfaces';
import { SunbirdVideoPlayerService } from '../sunbird-video-player.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ViewerService {

  public endPageSeen = false;
  public timeSpent = '0:0';
  private version = '1.0';
  public playerEvent = new EventEmitter<any>();
  public contentName: string;
  public showDownloadPopup: boolean;
  public src: string;
  public mimeType: string;
  public userName: string;
  private metaData: any;
  public PlayerLoadStartedAt: number;
  public totalTimeSpent: number;
  public totalLength;
  public visitedlength;


  constructor(private videoPlayerService: SunbirdVideoPlayerService, private utilService: UtilService) { 
      this.PlayerLoadStartedAt = new Date().getTime();
    }

  initialize({ context, config, metadata }: PlayerConfig) { 
    this.contentName = metadata.name;
    this.src =  metadata.streamingUrl || metadata.artifactUrl;
    this.mimeType = metadata.streamingUrl ? 'application/x-mpegURL': metadata.mimeType;
    if (context.userData) {
      const { userData: { firstName, lastName } } = context;
      this.userName = firstName === lastName ? firstName : `${firstName} ${lastName}`;
    }
    this.metaData = {
    };
    this.showDownloadPopup = false;
    this.endPageSeen = false;
  }


  public pageSessionUpdate() {

  }

  raiseStartEvent(event) {
    const duration = new Date().getTime() - this.PlayerLoadStartedAt;
    const startEvent = {
      eid: 'START',
      ver: this.version,
      edata: {
        type: 'START',
        mode: 'play',
        duration
      },
      metaData: this.metaData
    };
    this.playerEvent.emit(startEvent);
    this.videoPlayerService.start(duration);
  }

  raiseEndEvent() {
    const duration = new Date().getTime() - this.PlayerLoadStartedAt;
    const endEvent = {
      eid: 'END',
      ver: this.version,
      edata: {
        type: 'END',
        currentTime: this.visitedlength,
        totalTime: this.totalLength,
        duration
      },
      metaData: this.metaData
    };
    this.playerEvent.emit(endEvent);
    this.videoPlayerService.end(duration, this.totalLength, this.visitedlength, this.endPageSeen);
  }


  raiseHeartBeatEvent(type: string) {
    const hearBeatEvent = {
      eid: 'HEARTBEAT',
      ver: this.version,
      edata: {
        type,
        currentPage: 'videostage'
      },
      metaData: this.metaData
    };
    this.playerEvent.emit(hearBeatEvent);
    this.videoPlayerService.heartBeat(hearBeatEvent);
    const interactItems = ['PLAY', 'PAUSE', 'EXIT', 'VOLUME_CHANGE', 'DRAG', 'RATE_CHANGE', 'CLOSE_DOWNLOAD', 'DOWNLOAD', 'ZOOM_IN',
      'ZOOM_OUT', 'NAVIGATE_TO_PAGE',
      'NEXT', 'OPEN_MENU', 'PREVIOUS', 'CLOSE_MENU', 'DOWNLOAD_MENU',
      'SHARE', 'ROTATION_CHANGE', 'REPLAY'
    ];
    if (interactItems.includes(type)) {
      this.videoPlayerService.interact(type.toLowerCase(), 'videostage');
    }

  }

  raiseErrorEvent(error: Error) {
    const errorEvent = {
      eid: 'ERROR',
      ver: this.version,
      edata: {
        type: 'ERROR',
        stacktrace: error ? error.toString() : ''
      },
      metaData: this.metaData
    };
    this.playerEvent.emit(errorEvent);
    this.videoPlayerService.error(error);
  }

}
