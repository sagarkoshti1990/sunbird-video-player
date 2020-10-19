import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PlayerConfig } from './playerInterfaces';
import { ViewerService } from './services/viewer.service';

@Component({
  selector: 'sunbird-video-player',
  templateUrl: './sunbird-video-player.component.html',
  styles: ['./sunbird-video-player.component.scss']
})
export class SunbirdVideoPlayerComponent implements OnInit {

  @Input() playerConfig: PlayerConfig;
  viewState = 'player'
  sideMenuConfig = {
    showShare: true,
    showDownload: true,
    showReplay: true,
    showExit: false
  };
  options;

  constructor( public viewerService: ViewerService, public cdr: ChangeDetectorRef) { }

  ngOnInit() {
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

  playerEvents(event) {
    if(event.type === 'ended') {
      this.viewState = 'end';
    }
  }

  sideBarEvents(event) {

  }

  replayContent(event) {
    this.viewState = 'player';
  }

}
