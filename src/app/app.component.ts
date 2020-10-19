import { Component } from '@angular/core';
import { PlayerConfig } from 'projects/sunbird-video-player/src/lib/playerInterfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  playerConfig: PlayerConfig =  {
    context: {
      mode: 'play',
      authToken: '',
      sid: '7283cf2e-d215-9944-b0c5-269489c6fa56',
      did: '3c0a3724311fe944dec5df559cc4e006',
      uid: 'anonymous',
      channel: '505c7c48ac6dc1edc9b08f21db5a571d',
      pdata: {id: 'prod.diksha.portal', ver: '3.2.12', pid: 'sunbird-portal.contentplayer'},
      contextRollup: {l1: '505c7c48ac6dc1edc9b08f21db5a571d'},
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
    metadata: {"copyright":"diksha_ntptest_org","subject":["English"],"channel":"01272777697873100812","language":["English"],"mimeType":"video/mp4","objectType":"Content","gradeLevel":["Class 1"],"appIcon":"https://preprodall.blob.core.windows.net/ntp-content-preprod/content/do_213017746267758592156/artifact/resolution_exmple_1576820812420.thumb.png","primaryCategory":"Explanation Content","artifactUrl":"https://preprodall.blob.core.windows.net/ntp-content-preprod/content/assets/do_213017746267758592156/videoplayback-online-video-cutter.com.mp4","contentType":"Resource","identifier":"do_213017746267758592156","audience":["Student"],"visibility":"Default","mediaType":"content","osId":"org.ekstep.quiz.app","languageCode":["en"],"license":"CC BY 4.0","name":"10SecVideo","status":"Live","code":"501e6d16-e763-4e71-9a70-7e748a9a4d57","streamingUrl":"https://ntppreprodmedia-inct.streaming.media.azure.net/a16d85f1-5b3c-4553-9c69-e7bcc6258d60/videoplayback-online-video-cutte.ism/manifest(format=m3u8-aapl-v3)","medium":["English"],"createdOn":"2020-05-10T03:12:34.953+0000","copyrightYear":2020,"lastUpdatedOn":"2020-05-10T03:16:53.595+0000","creator":"content creator","pkgVersion":1,"versionKey":"1589080613595","framework":"ekstep_ncert_k-12","createdBy":"0ced9624-e65b-4fd0-a0d3-2f6e86dd3ef7","board":"CBSE","resourceType":"Learn","orgDetails":{"email":null,"orgName":"diksha_ntptest_org"},"licenseDetails":{"name":"CC BY 4.0","url":"https://creativecommons.org/licenses/by/4.0/legalcode","description":"For details see below:"}},
    data: {}
  };
}
