export const mockData = {
    transcripts: [
        {
          language: 'Bengali',
          languageCode: 'bn',
          identifier: 'do_11353887890259968011412',
          // eslint-disable-next-line max-len
          artifactUrl: 'https://cdn.jsdelivr.net/gh/tombyrer/videojs-transcript-click@1.0/demo/captions.sv.vtt'
        },
        {
          language: 'English',
          languageCode: 'en',
          identifier: 'do_11353887890285363211413',
          // eslint-disable-next-line max-len
          artifactUrl: 'https://dockstorage.blob.core.windows.net/sunbird-content-dock/content/assets/do_11353887890285363211413/titanic.1997.3d.720p.bluray.x264.-yts.mx-english.srt'
        },
        {
          language: 'Assamese',
          languageCode: 'as',
          identifier: 'do_11353887890287820811414',
          // eslint-disable-next-line max-len
          artifactUrl: 'https://cdn.jsdelivr.net/gh/tombyrer/videojs-transcript-click@1.0/demo/captions.ar.vtt'
        }
      ],
    changesForPlay: {
      config: {
        currentValue: {
            traceId: 'afhjgh',
            sideMenu: {
                showShare: true,
                showDownload: true,
                showReplay: true,
                showExit: true,
                enable: false
            },
            transcripts: [],
            actions: [
                {
                    play: 0
                },
                {
                    pause: 51.103101
                }
            ],
            volume: [],
            playBackSpeeds: [],
            totalDuration: 137.56,
            currentDuration: 51.103101
        },
        firstChange: true,
        previousValue: undefined,
        isFirstChange: () => {
          return true;
        }
    },
    action: {
        currentValue: {
            name: 'play'
        },
        firstChange: true,
        previousValue: undefined,
        isFirstChange: () => {
          return true;
        }
    }
    },
    changesForPause: {
      config: {
        currentValue: {
            traceId: 'afhjgh',
            sideMenu: {
                showShare: true,
                showDownload: true,
                showReplay: true,
                showExit: true,
                enable: false
            },
            transcripts: [],
            actions: [
                {
                    play: 0
                },
                {
                    pause: 51.103101
                }
            ],
            volume: [],
            playBackSpeeds: [],
            totalDuration: 137.56,
            currentDuration: 51.103101
        },
        firstChange: true,
        previousValue: undefined,
        isFirstChange: () => {
          return true;
        }
    },
    action: {
        currentValue: {
            name: 'pause'
        },
        firstChange: true,
        previousValue: undefined,
        isFirstChange: () => {
          return true;
        }
    }
    },
    changesForBlank: {
            config: {
          currentValue: {
              traceId: 'afhjgh',
              sideMenu: {
                  showShare: true,
                  showDownload: true,
                  showReplay: true,
                  showExit: true,
                  enable: false
              },
              transcripts: [],
              actions: [
                  {
                      play: 0
                  },
                  {
                      pause: 51.103101
                  }
              ],
              volume: [],
              playBackSpeeds: [],
              totalDuration: 137.56,
              currentDuration: 51.103101
          },
          firstChange: true,
          previousValue: undefined,
          isFirstChange: () => {
            return true;
          }
      },
      action: {
          currentValue: {
              name: ''
          },
          firstChange: true,
          previousValue: undefined,
          isFirstChange: () => {
            return true;
          }
      }
    }
};
