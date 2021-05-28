# @rumblestudio/**player-configs**

**Rumble Player** is an open source HTML5 audio player.

this lib contains default layout for the [Rumble player](https://www.npmjs.com/package/@rumblestudio/player-service) layout UI, which is also a dependency.
Just give it the DOM id of an HTMLElement container, and it will inflate it with controls for the player.

## Install

Install the package `@rumblestudio/player-configs`:

```shell
npm install @rumblestudio/player-configs
```

## Usage

### Angular

Install and import the library within an angular project already using the [Rumble player](https://www.npmjs.com/package/@rumblestudio/player-service) library

1. Install the lib as dependency in your project

```shell
npm install  @rumblestudio/player-configs # install the lib
```

2. Add a Div container in your template

```angular2html
<div id='container'></div>
```

3. At this point you have two choices : use one of our 5 default layouts, or give a layout configuration.

3.1 Using a default config

in your component ts file

```typescript
// import the default layout generator function
import { generateDefaultLayout } from '@rumblestudio/player-configs';

// after OnInit :
const player: playerService = generateDefaultLayout(myContainerID, configName);
// myContainerID is the ID of the container added in the template file
// configName one of these : 'config1', 'config2', 'config3', 'config4' or 'config5';
// you can interact with the returned player service
```

That's all, you have your customized player.

each config contains :

`config1 : PLAY BUTTON, PROGRESS BAR, PAUSE BUTTON`

`config2 : PLAY BUTTON, PAUSE BUTTON, PREV BUTTON, NEXT BUTTON`

`config3 : PLAY BUTTON, PAUSE BUTTON , PROGRESS BAR, STOP BUTTON`

`config4 : PLAY BUTTON, PAUSE BUTTON , PROGRESS BAR, STOP BUTTON, PREV BUTTON, NEXT BUTTON`

`config5 : PLAY BUTTON, PAUSE BUTTON, STOP BUTTON, PROGRESS BAR, PREV BUTTON, NEXT BUTTON, FORWARD BUTTON, REWIND BUTTON, SHUFFLE BUTTON, LOOP BUTTON`

3.2 Using your custum defined config

in your component ts file

```typescript
// import the default layout generator function
import { generateDefaultLayout } from '@rumblestudio/player-configs' ;


// after OnInit :
const player: playerService = generateLayout(myContainerID, myConf);
// myContainerID is the ID of the container added in the template file

myConf :
    { layout: {columns: number, rows: number},
     elements: <{task: string, span: number}>[],
     dimensions: {width: string, height: string}}

// Dimensions are in pixels,
//the element array contains an array of buttons and / or seekbar you want to show in order
// you can interact with the returned player service
```

find below the list of available buttons :

`play` triggers play

`pause` triggers pause

`prev` play previously played song

`next` play next song in the playlist

`stop` stops the player

`forward` jump 15s forward in the playing

`rewind` jump 15s backward in the playing

`shuffle` shuffle playlist

`loop` keep playing the same song

`bar` show progress bar

## Support

This library is actively supported by Rumble Studio who helps to create audio content. Check it out: [Rumble Studio](https://rumble.studio)

<img src="https://rumblestudio.app/assets/rs-logos/classic-reversed.svg"></img>
