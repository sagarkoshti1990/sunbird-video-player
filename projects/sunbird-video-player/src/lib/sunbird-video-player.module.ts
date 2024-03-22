import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PLAYER_CONFIG, SunbirdPlayerSdkModule } from '@project-sunbird/sunbird-player-sdk-v9';
import { SunbirdVideoPlayerComponent } from './sunbird-video-player.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { ErrorService } from '@project-sunbird/sunbird-player-sdk-v9';
import { HttpClientModule } from '@angular/common/http';
import { QumlLibraryModule } from '@project-sunbird/sunbird-quml-player';

@NgModule({
  declarations: [SunbirdVideoPlayerComponent, VideoPlayerComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SunbirdPlayerSdkModule,
    QumlLibraryModule,
  ],
  providers: [ErrorService, { provide: PLAYER_CONFIG, useValue: { contentCompatibilityLevel: 5 } }],
  exports: [SunbirdVideoPlayerComponent]
})
export class SunbirdVideoPlayerModule { }
