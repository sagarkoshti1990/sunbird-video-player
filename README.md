# Video player library for Sunbird platform!
Contains Video player library components powered by angular. These components are designed to be used in sunbird consumption platforms *(mobile app, web portal, offline desktop app)* to drive reusability, maintainability hence reducing the redundant development effort significantly.

# Getting Started
For help getting started with a new Angular app, check out the Angular CLI.
For existing apps, follow these steps to begin using .

## Step 1: Install the packages

    npm install @project-sunbird/sunbird-video-player-v9 --save
    npm install @project-sunbird/sunbird-quml-player-v9 --save
    npm install @project-sunbird/sb-styles --save
    npm install @project-sunbird/client-services --save
    npm install lodash-es --save
    npm install ngx-bootstrap --save
    npm install jquery --save
    npm install video.js --save
    npm install videojs-contrib-quality-levels --save
    npm install videojs-http-source-selector --save

## Step 2: Include the styles, scripts and assets in angular.json
    "styles": [
    ...
    ...
    "src/styles.css",
    "./node_modules/@project-sunbird/sb-styles/assets/_styles.scss",
    "./node_modules/video.js/dist/video-js.min.css",
    "./node_modules/@project-sunbird/sunbird-video-player-v9/lib/assets/videojs.markers.min.css",
    "./node_modules/videojs-http-source-selector/dist/videojs-http-source-selector.css"
    ],
    "scripts": [
    ...
    ...
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/video.js/dist/video.js",
    "node_modules/@project-sunbird/sunbird-video-player-v9/lib/assets/videojs-markers.js",
    "node_modules/videojs-contrib-quality-levels/dist/videojs-contrib-quality-levels.min.js",
    "node_modules/videojs-http-source-selector/dist/videojs-http-source-selector.min.js"
    ]

  Add following under architect.build.assets

     {
	    ...
	    "build": {
	    
	    "builder": "@angular-devkit/build-angular:browser",
	    
	    "options": {
		    ...
		    ...
    
		    "assets": [
		    
			   ...
			   ...
			    
			    {
				    "glob": "**/*.*",
				    "input": "./node_modules/@project-sunbird/sunbird-video-player-v9/lib/assets/",
				    "output": "/assets/"
			    }
		    
		    ],
    
	    "styles": [
	    
	    ...
	    
	    "./node_modules/@project-sunbird/sb-styles/assets/_styles.scss",
	    "./node_modules/video.js/dist/video-js.min.css",
        "./node_modules/@project-sunbird/sunbird-video-player-v9/lib/assets/videojs.markers.min.css",
        "./node_modules/videojs-http-source-selector/dist/videojs-http-source-selector.css"
	    ],
	    "scripts": [
         ...
         "node_modules/jquery/dist/jquery.min.js",
         "node_modules/video.js/dist/video.js",
         "node_modules/@project-sunbird/sunbird-video-player-v9/lib/assets/videojs-markers.js",
         "node_modules/videojs-contrib-quality-levels/dist/videojs-contrib-quality-levels.min.js",
         "node_modules/videojs-http-source-selector/dist/videojs-http-source-selector.min.js"
         ]
	    ...
	    ...
    
    },

  

## Step 3: Import the modules and components
Import the NgModule where you want to use. Also create a [question-cursor-implementation.service](src/app/question-cursor-implementation.service.ts)
       
    import { SunbirdVideoPlayerModule } from '@project-sunbird/sunbird-video-player-v9';
    import { QuestionCursor } from '@project-sunbird/sunbird-quml-player-v9';
    import { QuestionCursorImplementationService } from './question-cursor-implementation.service';

    
    @NgModule({
	    ...
	    
	    imports: [SunbirdVideoPlayerModule],
	    providers: [{ provide: QuestionCursor, useClass: QuestionCursorImplementationService }],
	    
	    ...
    })

  
    export class TestAppModule { }

## Step 4: Send input to render Video player

Use the mock config in your component to send input to Video player
Click to see the mock - [playerConfig](src/app/data.ts)

## Available components
|Feature| Notes| Selector|Code|Input|Output
|--|--|--|------------------------------------------------------------------------------------------|---|--|
| Video Player | Can be used to render videos | sunbird-video-player| *`<sunbird-video-player [playerConfig]="playerConfig"><sunbird-video-player>`*|playerConfig|playerEvent, telemetryEvent|

## Use as web components	

Import this library in any web application and use the custom component.

Follow below-mentioned steps to use it in plain javascript project:

- Insert [library](https://github.com/project-sunbird/sunbird-video-player/blob/release-4.3.0/web-component/sunbird-video-player.js) as below:
	```javascript
	<script type="text/javascript" src="sunbird-video-player.js"></script>
	```
- Create a asset folder and copy all the files from [here](https://github.com/project-sunbird/sunbird-video-player/tree/release-4.3.0/web-component/assets), library requires these assets internally to work well.
- Get sample playerConfig from here: [playerConfig](https://github.com/project-sunbird/sunbird-video-player/blob/release-4.3.0/src/app/data.ts)

- Pass the QuestionListAPI baseUrl for eg. 
	```javascript
    window.questionListUrl = 'https://staging.sunbirded.org/api/question/v1/list';
    window.questionSetBaseUrl = 'https://staging.sunbirded.org/api/questionset';
    ```
  
- Create a custom html element: `sunbird-video-player`
	```javascript
    const  videoElement = document.createElement('sunbird-video-player');
   ```

- Pass data using `player-config`
	```javascript
	videoElement.setAttribute('player-config', JSON.stringify(playerConfig));
	```

	**Note:** Attribute should be in **string** type

- Listen for the output events: **playerEvent** and **telemetryEvent**

	```javascript
	videoElement.addEventListener('playerEvent', (event) => {
		console.log("On playerEvent", event);
	});
	videoElement.addEventListener('telemetryEvent', (event) => {
		console.log("On telemetryEvent", event);
	});
	```
- Append this element to existing element
	```javascript
	const  myPlayer = document.getElementById("my-player");
	myPlayer.appendChild(qumlPlayerElement);
	```
- Refer demo [example](https://github.com/project-sunbird/sunbird-video-player/blob/release-4.3.0/web-component/index.html)
