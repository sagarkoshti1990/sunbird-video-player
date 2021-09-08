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
    npm install videojs-thumbnails --save

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