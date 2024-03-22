import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorService, PLAYER_CONFIG, SunbirdPlayerSdkModule } from '@project-sunbird/sunbird-player-sdk-v9';
import { QuestionCursor, QumlLibraryModule } from '@project-sunbird/sunbird-quml-player';
import { SunbirdVideoPlayerComponent } from '@project-sunbird/sunbird-video-player-v9';
import { QCImplementationService } from './QCImplementationService';

@NgModule({
    declarations: [
      
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        SunbirdPlayerSdkModule,
        QumlLibraryModule,
    ],
    providers: [ErrorService,
        { provide: QuestionCursor, useClass: QCImplementationService },
        { provide: PLAYER_CONFIG, useValue: { contentCompatibilityLevel: 5 } }
    ]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) { }
  ngDoBootstrap() {
    const customElement = createCustomElement(SunbirdVideoPlayerComponent, { injector: this.injector });
    customElements.define('sunbird-video-player', customElement);
  }
}

