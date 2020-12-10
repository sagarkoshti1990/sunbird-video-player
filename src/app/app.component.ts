import { Component } from '@angular/core';
import { PlayerConfig } from 'projects/sunbird-video-player/src/lib/playerInterfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  playerConfig: PlayerConfig = {
    context: {
      mode: 'play',
      authToken: '',
      sid: '7283cf2e-d215-9944-b0c5-269489c6fa56',
      did: '3c0a3724311fe944dec5df559cc4e006',
      uid: 'anonymous',
      channel: '505c7c48ac6dc1edc9b08f21db5a571d',
      pdata: { id: 'prod.diksha.portal', ver: '3.2.12', pid: 'sunbird-portal.contentplayer' },
      contextRollup: { l1: '505c7c48ac6dc1edc9b08f21db5a571d' },
      tags: [
        ''
      ],
      cdata: [],
      timeDiff: 0,
      objectRollup: {},
      host: '',
      endpoint: '',
      userData: {
        firstName: 'Harish Kumar',
        lastName: 'Gangula'
      }
    },
    config: {

    },
    // tslint:disable-next-line:max-line-length
    metadata: { "copyright": "सहज | SAHAJ", "subject": ["D.El.Ed. Uttar Pradesh"], "channel": "01246376237871104093", "language": ["English"], "mimeType": "video/mp4", "gradeLevel": ["Class 3", "Class 4", "Class 5", "Class 6", "Class 1", "Class 7", "Class 2", "Class 8"], "appIcon": "https://ntpproductionall.blob.core.windows.net/ntp-content-production/content/do_31312275950357708811047/artifact/video_9105_1533209595_1533209595820.thumb.png", "artifactUrl": "https://ekstep-public-qa.s3-ap-south-1.amazonaws.com/assets/do_2124856874881761281247/samplevideo_1280x720_1mb.mp4", "contentType": "TVLesson", "identifier": "do_31312275950357708811047", "audience": ["Learner"], "visibility": "Default", "mediaType": "content", "osId": "org.ekstep.quiz.app", "languageCode": ["en"], "license": "CC BY 4.0", "name": "INCL_VIDEO_UNIT-16mp4", "status": "Live", "code": "ae14885c-e2c0-4151-8015-bec2d966b133", "streamingUrl": "https://ntpprodmedia-inct.streaming.media.azure.net/20f5294d-965b-4448-bb77-2a1b66c76f8a/incl_video_unit-16mp4.ism/manifest(format=m3u8-aapl-v3)", "medium": ["Hindi"], "createdOn": "2020-10-05T12:02:33.465+0000", "copyrightYear": 2020, "lastUpdatedOn": "2020-10-07T09:31:18.436+0000", "creator": "UP SCERT", "pkgVersion": 1, "versionKey": "1602063078436", "framework": "up_k-12", "createdBy": "f633f462-1b78-4a9f-bdfb-3b7c57808f89", "board": "State (Uttar Pradesh)", "resourceType": "Learn", "orgDetails": { "email": null, "orgName": "सहज | SAHAJ" }, "licenseDetails": { "name": "CC BY 4.0", "url": "https://creativecommons.org/licenses/by/4.0/legalcode", "description": "For details see below:" } },
    data: {}
  };

  playerEvent(event) {
    console.log(event);
  }

  telemetryEvent(event) {
    console.log('in app: ', JSON.stringify(event));
  }
}
