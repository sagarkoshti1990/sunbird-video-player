import { AfterViewInit, Component, ElementRef, Input, Output, ViewChild, ViewEncapsulation, EventEmitter, Renderer2 } from '@angular/core';
import videojs from 'video.js';
import { ViewerService } from '../../services/viewer.service';

@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoPlayerComponent implements AfterViewInit {
  showBackwardButton = false;
  showForwardButton = false;
  showPlayButton = true;
  showPauseButton = false;
  showControls = true;
  private unlistenMouseEnter: () => void;
  private unlistenMouseLeave: () => void;
  @ViewChild('target') target: ElementRef;
  @Input() options: {
    sources: {
      src: string,
      type: string,
    }[]
  };
  player: videojs.Player;
  totalSeekedLength = 0;
  previousTime = 0;
  currentTime = 0;
  seekStart = null;


  constructor( public viewerService: ViewerService, private renderer2: Renderer2) {}

  ngAfterViewInit() {
    this.player = videojs(this.target.nativeElement, {
      fluid: true,
      sources: this.options.sources,
      autoplay: true,
      playbackRates: [0.5, 1, 1.5, 2],
      controlBar: {
        children: ['durationDisplay', 'volumePanel', 
           'progressControl', 'remainingTimeDisplay',
           'playbackRateMenuButton']
      }
    }, function onLoad()  {
     
    });
    this.registerEvents();


    this.unlistenMouseEnter = this.renderer2.listen(this.target.nativeElement, 'mouseenter', () => {
      this.showControls = true;
    });

    this.unlistenMouseLeave = this.renderer2.listen(this.target.nativeElement, 'mouseleave', () => {
      this.showControls = false;
    });
    
  }

  registerEvents() {

    const events = ['loadstart', 'play', 'ended', 'pause', 'durationchange',
    'error', 'playing', 'progress', 'seeked', 'seeking', 'volumechange',
    'ratechange', 'timeupdate']

    events.forEach(event => {
      this.player.on(event, (data) => {
        this.handleVideoControls(data);
        this.viewerService.playerEvent.emit(data);
      })
    })
    
  }

  play() {
    this.player.play();
    this.showPauseButton = true;
    this.showPlayButton = false;
    this.showBackwardButton = true;
    this.showForwardButton = true;
    this.viewerService.raiseHeartBeatEvent('PLAY');
  }

  pause() {
    this.player.pause();
    this.showPauseButton = false;
    this.showPlayButton = true;
    this.showBackwardButton = false;
    this.showForwardButton = false;
    this.viewerService.raiseHeartBeatEvent('PAUSE');
  }

  backward(time) {
    this.player.currentTime(this.player.currentTime() - time);
    this.viewerService.raiseHeartBeatEvent('BACKWARD');
  }

  forward(time) {
    this.player.currentTime(this.player.currentTime() + time);
    this.viewerService.raiseHeartBeatEvent('FORWARD');
  }

  handleVideoControls({type}) {
    if(type === "playing") {
      this.showPlayButton = false;
      this.showPauseButton = true;
      this.showBackwardButton = true;
      this.showForwardButton = true;
    }
    if (type === 'ended') {
      this.viewerService.visitedlength = this.player.currentTime();
      this.viewerService.totalLength = this.player.duration();
    }

    // Calulating total seeked length
    if (type === 'timeupdate') {
      this.previousTime = this.currentTime;
      this.currentTime = this.player.currentTime();
    }
    if (type === 'seeking') {
      if (this.seekStart === null) { this.seekStart = this.previousTime; }
    }
    if (type === 'seeked') {
      console.log('seeked from', this.seekStart, 'to', this.currentTime, '; delta:', this.currentTime - this.seekStart);
      if (this.currentTime > this.seekStart) {
        this.totalSeekedLength = this.totalSeekedLength + (this.currentTime - this.seekStart);
      } else if (this.seekStart > this.currentTime) {
        this.totalSeekedLength = this.totalSeekedLength + (this.seekStart - this.currentTime);
      }
      this.viewerService.totalSeekedLength = this.totalSeekedLength;
      console.log('Total seeked length = ', this.totalSeekedLength);
      this.seekStart = null;
    }
  }
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
    this.unlistenMouseLeave();
    this.unlistenMouseEnter();
  }
}
