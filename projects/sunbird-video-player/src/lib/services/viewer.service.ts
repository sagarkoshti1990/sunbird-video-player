import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { of } from 'rxjs';
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
  public artifactMimeType: string;
  public userName: string;
  private metaData: any;
  public PlayerLoadStartedAt: number;
  public totalLength;
  public currentlength;
  public totalSeekedLength;
  public artifactUrl;
  public visitedLength;
  public sidebarMenuEvent = new EventEmitter<any>();
  private sources: object[];

  constructor(private videoPlayerService: SunbirdVideoPlayerService,
    private utilService: UtilService,
    private http: HttpClient) {
    this.PlayerLoadStartedAt = new Date().getTime();
  }

  initialize({ context, config, metadata }: PlayerConfig) {
    this.contentName = metadata.name;
    this.src = metadata.streamingUrl || metadata.artifactUrl;
    this.artifactUrl = metadata.artifactUrl;
    this.mimeType = metadata.streamingUrl ? 'application/x-mpegURL' : metadata.mimeType;
    this.artifactMimeType = metadata.mimeType;
    this.sources = [{
      src: this.src,
      type: this.mimeType
    }, {
      src: this.artifactUrl,
      type: metadata.mimeType
    }
    ]
    if (context.userData) {
      const { userData: { firstName, lastName } } = context;
      this.userName = firstName === lastName ? firstName : `${firstName} ${lastName}`;
    }
    this.metaData = {
    };
    this.showDownloadPopup = false;
    this.endPageSeen = false;
  }

  async getPlayerOptions() {

    const data = await this.http.get(this.src).toPromise().catch(error => {
      this.raiseErrorEvent(new Error(`Streaming Url Not Supported  ${this.src}`))
    })
    if (data) {
      return [{ src: this.src, type: this.mimeType }];
    }
    else {
      return [{ src: this.artifactUrl, type: this.artifactMimeType }];
    }
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
    this.PlayerLoadStartedAt = new Date().getTime();
  }

  raiseEndEvent() {
    const duration = new Date().getTime() - this.PlayerLoadStartedAt;
    const endEvent = {
      eid: 'END',
      ver: this.version,
      edata: {
        type: 'END',
        currentTime: this.currentlength,
        totalTime: this.totalLength,
        duration
      },
      metaData: this.metaData
    };
    this.playerEvent.emit(endEvent);
    this.timeSpent = this.utilService.getTimeSpentText(this.visitedLength);
    this.videoPlayerService.end(duration, this.totalLength, this.currentlength, this.endPageSeen, this.totalSeekedLength,
      this.visitedLength / 1000);
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
      'SHARE', 'ROTATION_CHANGE', 'REPLAY', 'FORWARD', 'BACKWARD'
    ];
    if (interactItems.includes(type)) {
      this.videoPlayerService.interact(type.toLowerCase(), 'videostage');
    }

  }

  raiseErrorEvent(error: Error, type?: string) {
    const errorEvent = {
      eid: 'ERROR',
      ver: this.version,
      edata: {
        type: type || 'ERROR',
        stacktrace: error ? error.toString() : ''
      },
      metaData: this.metaData
    };
    this.playerEvent.emit(errorEvent);
    if (!type) {
      this.videoPlayerService.error(error);
    }
  }

}
