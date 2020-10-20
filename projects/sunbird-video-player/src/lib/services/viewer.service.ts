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

  constructor(private sunbirdPdfPlayerService: SunbirdVideoPlayerService) { 
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
    // this.currentPagePointer = this.currentPagePointer > event.pagesCount ? 1 : this.currentPagePointer,
    //   this.metaData.totalPages = event.pagesCount;
    // this.totalNumberOfPages = event.pagesCount;
    // const duration = new Date().getTime() - this.pdfPlayerStartTime;
    // const startEvent = {
    //   eid: 'START',
    //   ver: this.version,
    //   edata: {
    //     type: 'START',
    //     currentPage: this.currentPagePointer,
    //     duration
    //   },
    //   metaData: this.metaData
    // };
    // this.playerEvent.emit(startEvent);
    // this.pdfLastPageTime = this.pdfPlayerStartTime = new Date().getTime();
    // this.sunbirdPdfPlayerService.start(duration);
  }

  raiseEndEvent() {
    // const duration = new Date().getTime() - this.pdfPlayerStartTime;
    // const endEvent = {
    //   eid: 'END',
    //   ver: this.version,
    //   edata: {
    //     type: 'END',
    //     currentPage: this.currentPagePointer,
    //     totalPages: this.totalNumberOfPages,
    //     duration
    //   },
    //   metaData: this.metaData
    // };
    // this.playerEvent.emit(endEvent);
    // const visitedlength = (this.metaData.pagesHistory.filter((v, i, a) => a.indexOf(v) === i)).length;
    // this.timeSpent = this.utilService.getTimeSpentText(this.pdfPlayerStartTime);
    // this.sunbirdPdfPlayerService.end(duration,
    //   this.currentPagePointer, this.totalNumberOfPages, visitedlength, this.endPageSeen);
  }


  raiseHeartBeatEvent(type: string) {
    // const hearBeatEvent = {
    //   eid: 'HEARTBEAT',
    //   ver: this.version,
    //   edata: {
    //     type,
    //     currentPage: this.currentPagePointer
    //   },
    //   metaData: this.metaData
    // };
    // this.playerEvent.emit(hearBeatEvent);
    // this.sunbirdPdfPlayerService.heartBeat(hearBeatEvent);
    // if (type === 'PAGE_CHANGE') {
    //   this.sunbirdPdfPlayerService.impression(this.currentPagePointer); 
    // }
    // const interactItems = ['CLOSE_DOWNLOAD', 'DOWNLOAD', 'ZOOM_IN',
    //   'ZOOM_OUT', 'NAVIGATE_TO_PAGE',
    //   'NEXT', 'OPEN_MENU', 'PREVIOUS', 'CLOSE_MENU', 'DOWNLOAD_MENU',
    //   'SHARE', 'ROTATION_CHANGE', 'REPLAY'
    // ];
    // if (interactItems.includes(type)) {
    //   this.sunbirdPdfPlayerService.interact(type.toLowerCase(), this.currentPagePointer);
    // }

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
    this.sunbirdPdfPlayerService.error(error);
  }

}
