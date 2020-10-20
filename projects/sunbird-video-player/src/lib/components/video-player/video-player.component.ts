import { AfterViewInit, Component, ElementRef, Input, Output, ViewChild, ViewEncapsulation, EventEmitter } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoPlayerComponent implements AfterViewInit {
  isVisible = true;
  @ViewChild('target') target: ElementRef;
  @Output() playerEvents = new EventEmitter<any>();
  @Input() options: {
    sources: {
      src: string,
      type: string,
    }[]
  };
  player: videojs.Player;

  ngAfterViewInit() {
    this.player = videojs(this.target.nativeElement, {
      fluid: true,
      sources: this.options.sources,
      autoplay: true,
      playbackRates: [0.5, 1, 1.5, 2],
      controlBar: {
        children: ['durationDisplay', 'volumePanel', 
           'progressControl', 'remainingTimeDisplay',
           'playbackRateMenuButton', 'fullscreenToggle']
      }
    }, function onLoad()  {
      console.log(`Player ready start event`)
    });
    this.registerEvents();
    
  }

  registerEvents() {

    this.player.on('ended', (event) => {
      this.playerEvents.emit(event);
    })

    this.player.on('play', (event) => {
      this.playerEvents.emit(event);
    })
    
    this.player.on('pause', (event) => {
      this.playerEvents.emit(event);
    })
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
