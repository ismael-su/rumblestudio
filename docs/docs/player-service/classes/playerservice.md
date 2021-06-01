[@rumblestudio/player-service](../README.md) / [Exports](../modules.md) / PlayerService

# Class: PlayerService

Class representing a service that exposes an API for
playing audio files

## Table of contents

### Constructors

-   [constructor](playerservice.md#constructor)

### Properties

-   [\_duration](playerservice.md#_duration)
-   [\_index](playerservice.md#_index)
-   [\_isPlaying](playerservice.md#_isplaying)
-   [\_percentage](playerservice.md#_percentage)
-   [\_playlist](playerservice.md#_playlist)
-   [\_position](playerservice.md#_position)
-   [\_rate](playerservice.md#_rate)
-   [\_shuffle](playerservice.md#_shuffle)
-   [\_unloadAll](playerservice.md#_unloadall)
-   [\_volume](playerservice.md#_volume)
-   [autoPlay](playerservice.md#autoplay)
-   [autoPlayNext](playerservice.md#autoplaynext)
-   [loop](playerservice.md#loop)
-   [playingEventsCallbacks](playerservice.md#playingeventscallbacks)

### Accessors

-   [duration](playerservice.md#duration)
-   [index](playerservice.md#index)
-   [isPlaying](playerservice.md#isplaying)
-   [percentage](playerservice.md#percentage)
-   [playlist](playerservice.md#playlist)
-   [position](playerservice.md#position)
-   [rate](playerservice.md#rate)
-   [shuffle](playerservice.md#shuffle)
-   [unloadAll](playerservice.md#unloadall)
-   [volume](playerservice.md#volume)

### Methods

-   [PlayerStateChangedCallback](playerservice.md#playerstatechangedcallback)
-   [addNewOnCallback](playerservice.md#addnewoncallback)
-   [addSong](playerservice.md#addsong)
-   [download](playerservice.md#download)
-   [emit](playerservice.md#emit)
-   [generateSongFromUrl](playerservice.md#generatesongfromurl)
-   [getRank](playerservice.md#getrank)
-   [getSong](playerservice.md#getsong)
-   [getSongTimeLeft](playerservice.md#getsongtimeleft)
-   [getSongTotalTime](playerservice.md#getsongtotaltime)
-   [loadSong](playerservice.md#loadsong)
-   [next](playerservice.md#next)
-   [pause](playerservice.md#pause)
-   [play](playerservice.md#play)
-   [playWithOptions](playerservice.md#playwithoptions)
-   [preloadPlaylist](playerservice.md#preloadplaylist)
-   [prev](playerservice.md#prev)
-   [seekPerPercentage](playerservice.md#seekperpercentage)
-   [seekPerPosition](playerservice.md#seekperposition)
-   [setPLaylistFromRSSFeedURL](playerservice.md#setplaylistfromrssfeedurl)
-   [setPlaylistFromSongObjects](playerservice.md#setplaylistfromsongobjects)
-   [setPlaylistFromUrls](playerservice.md#setplaylistfromurls)
-   [shufflePlaylist](playerservice.md#shuffleplaylist)
-   [stop](playerservice.md#stop)
-   [unload](playerservice.md#unload)
-   [unloadSong](playerservice.md#unloadsong)

## Constructors

### constructor

• **new PlayerService**(`update_delay?`)

Create a player service

#### Parameters

| Name           | Type     | Default value |
| :------------- | :------- | :------------ |
| `update_delay` | `number` | 100           |

#### Defined in

[lib/player-service.ts:235](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L235)

## Properties

### \_duration

• `Private` **\_duration**: `number`

The total duration of the song actually being played

#### Defined in

[lib/player-service.ts:190](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L190)

---

### \_index

• `Private` **\_index**: `number`

The index in the playlist of the song
actually being played

#### Defined in

[lib/player-service.ts:149](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L149)

---

### \_isPlaying

• `Private` **\_isPlaying**: `boolean` = false

True when there is a song actually being played

#### Defined in

[lib/player-service.ts:22](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L22)

---

### \_percentage

• `Private` **\_percentage**: `number`

The progress in percentage of the song being played

#### Defined in

[lib/player-service.ts:203](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L203)

---

### \_playlist

• `Private` **\_playlist**: [Song](../interfaces/song.md)[]

An array containing a set set of song to be played
it can contain a single song or multiple songs loaded
from an RSS feed URL, audio file urls or Song Objects

#### Defined in

[lib/player-service.ts:166](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L166)

---

### \_position

• `Private` **\_position**: `number`

The progress in seconds of the song being played

#### Defined in

[lib/player-service.ts:218](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L218)

---

### \_rate

• `Private` **\_rate**: `number` = 1

The rate of the playback speed, a value between 0.5 to 4.0
1.0 is the normal speed which is default value

#### Defined in

[lib/player-service.ts:102](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L102)

---

### \_shuffle

• **\_shuffle**: `boolean` = false

If set to true, the playlist will be shuffled in a random a order

#### Defined in

[lib/player-service.ts:50](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L50)

---

### \_unloadAll

• **\_unloadAll**: `boolean` = false

If set to true, player will keep loaded only 3 songs in the playlist:
the previous song, actual song and next song. This will not have any
effect if the playlist contains less than 5 songs

#### Defined in

[lib/player-service.ts:81](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L81)

---

### \_volume

• `Private` **\_volume**: `number` = 1

The volume of playback. a value between 0 to 1.0.
default value is the max : 1

#### Defined in

[lib/player-service.ts:124](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L124)

---

### autoPlay

• **autoPlay**: `boolean` = false

If set to true, the player will automatically start playing
when a new song or playlist is loaded

#### Defined in

[lib/player-service.ts:44](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L44)

---

### autoPlayNext

• **autoPlayNext**: `boolean` = true

When set to true the player will automatically
play the next song in the playlist when actual
song reaches end

#### Defined in

[lib/player-service.ts:19](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L19)

---

### loop

• **loop**: `boolean` = false

If set to true, the actually played song will be played in loop

#### Defined in

[lib/player-service.ts:47](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L47)

---

### playingEventsCallbacks

• `Private` **playingEventsCallbacks**: (`event`: [PlayerServiceEvent](../interfaces/playerserviceevent.md)) => `void`[] = []

CALLBACKS ON STATE CHANGE

#### Defined in

[lib/player-service.ts:907](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L907)

## Accessors

### duration

• `get` **duration**(): `number`

Get the value of \_duration

#### Returns

`number`

#### Defined in

[lib/player-service.ts:193](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L193)

• `set` **duration**(`newDuration`): `void`

Set the value of \_duration

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `newDuration` | `number` |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:197](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L197)

---

### index

• `get` **index**(): `number`

Get the value of \_index

#### Returns

`number`

#### Defined in

[lib/player-service.ts:151](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L151)

• `set` **index**(`value`): `void`

Set the value of \_index

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:156](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L156)

---

### isPlaying

• `get` **isPlaying**(): `boolean`

Get the \_isPlaying value

#### Returns

`boolean`

#### Defined in

[lib/player-service.ts:25](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L25)

• `set` **isPlaying**(`newPlayingState`): `void`

Set the \_isPlaying value

#### Parameters

| Name              | Type      |
| :---------------- | :-------- |
| `newPlayingState` | `boolean` |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:30](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L30)

---

### percentage

• `get` **percentage**(): `number`

Get the value of \_percentage

#### Returns

`number`

#### Defined in

[lib/player-service.ts:206](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L206)

• `set` **percentage**(`newPercentage`): `void`

Set the value of \_percentage

#### Parameters

| Name            | Type     |
| :-------------- | :------- |
| `newPercentage` | `number` |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:211](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L211)

---

### playlist

• `get` **playlist**(): [Song](../interfaces/song.md)[]

Get the value of \_playlist

#### Returns

[Song](../interfaces/song.md)[]

#### Defined in

[lib/player-service.ts:171](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L171)

• `set` **playlist**(`playlist`): `void`

Set the value of playlist

#### Parameters

| Name       | Type                            |
| :--------- | :------------------------------ |
| `playlist` | [Song](../interfaces/song.md)[] |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:179](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L179)

---

### position

• `get` **position**(): `number`

Get the value of \_position

#### Returns

`number`

#### Defined in

[lib/player-service.ts:221](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L221)

• `set` **position**(`newPosition`): `void`

Set the value of \_position

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `newPosition` | `number` |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:226](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L226)

---

### rate

• `get` **rate**(): `number`

Get the value of \_rate

#### Returns

`number`

#### Defined in

[lib/player-service.ts:105](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L105)

• `set` **rate**(`rate`): `void`

Set the value of rate

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `rate` | `number` |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:110](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L110)

---

### shuffle

• `get` **shuffle**(): `boolean`

Get the value of \_shuffle

#### Returns

`boolean`

#### Defined in

[lib/player-service.ts:53](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L53)

• `set` **shuffle**(`value`): `void`

Set the value of shuffle

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:58](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L58)

---

### unloadAll

• `get` **unloadAll**(): `boolean`

Get the value of \_unloadAll

#### Returns

`boolean`

#### Defined in

[lib/player-service.ts:84](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L84)

• `set` **unloadAll**(`value`): `void`

Set the value of \_unloadAll

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:89](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L89)

---

### volume

• `get` **volume**(): `number`

Get the value of \_volume

#### Returns

`number`

#### Defined in

[lib/player-service.ts:127](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L127)

• `set` **volume**(`level`): `void`

Set the value of \_volume

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `level` | `number` |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:132](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L132)

## Methods

### PlayerStateChangedCallback

▸ `Private` **PlayerStateChangedCallback**(`event`): `void`

#### Parameters

| Name    | Type                                                      |
| :------ | :-------------------------------------------------------- |
| `event` | [PlayerServiceEvent](../interfaces/playerserviceevent.md) |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:909](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L909)

---

### addNewOnCallback

▸ **addNewOnCallback**(`callback`): `void`

CALLBACKS ON UPDATE

#### Parameters

| Name       | Type                                                                           |
| :--------- | :----------------------------------------------------------------------------- |
| `callback` | (`event`: [PlayerServiceEvent](../interfaces/playerserviceevent.md)) => `void` |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:898](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L898)

---

### addSong

▸ **addSong**(`songFileUrl`): `void`

Add a new track in the playlist

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `songFileUrl` | `string` |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:402](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L402)

---

### download

▸ **download**(`index?`): `Promise`<void\>

Allows to download song file from its index in the playlist.
If the index is not provided, it will download the track actually played

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `index?` | `number` |

#### Returns

`Promise`<void\>

#### Defined in

[lib/player-service.ts:864](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L864)

---

### emit

▸ `Private` **emit**(`type`): `void`

Responsible for emitting events whenever the player state changes

#### Parameters

| Name   | Type                                                         |
| :----- | :----------------------------------------------------------- |
| `type` | [PlayerServiceEventType](../enums/playerserviceeventtype.md) |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:917](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L917)

---

### generateSongFromUrl

▸ `Private` **generateSongFromUrl**(`url`, `index`): [Song](../interfaces/song.md)

Allows to generate a song object using an URL

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `url`   | `string` |
| `index` | `number` |

#### Returns

[Song](../interfaces/song.md)

#### Defined in

[lib/player-service.ts:775](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L775)

---

### getRank

▸ **getRank**(`song`): `number`

Returns the index of a given song in the playlist

#### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `song` | [Song](../interfaces/song.md) |

#### Returns

`number`

#### Defined in

[lib/player-service.ts:254](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L254)

---

### getSong

▸ **getSong**(`index`, `instanciateHowlIfMissing?`): [Song](../interfaces/song.md)

Returns the song at index in the playlist, if instanciateHowlIfMissing
is set to true, it will load the song if it is not already loaded
this is important when unloadAll is set to true

#### Parameters

| Name                       | Type      | Default value |
| :------------------------- | :-------- | :------------ |
| `index`                    | `number`  | `undefined`   |
| `instanciateHowlIfMissing` | `boolean` | true          |

#### Returns

[Song](../interfaces/song.md)

#### Defined in

[lib/player-service.ts:275](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L275)

---

### getSongTimeLeft

▸ **getSongTimeLeft**(`index?`): `number`

Returns the ETA of the actual song in seconds, if index provided it will
return the ETA for the song at index in the playlist

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `index?` | `number` |

#### Returns

`number`

#### Defined in

[lib/player-service.ts:698](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L698)

---

### getSongTotalTime

▸ **getSongTotalTime**(`index?`): `number`

Returns the total duration in seconds of the song at index
otherwise it returns the total duration of the actual song

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `index?` | `number` |

#### Returns

`number`

#### Defined in

[lib/player-service.ts:719](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L719)

---

### loadSong

▸ **loadSong**(`song`): `void`

Load a song

#### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `song` | [Song](../interfaces/song.md) |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:393](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L393)

---

### next

▸ **next**(): `void`

Play next song in the playlist, if we are already on the last track
it will play the first one

#### Returns

`void`

#### Defined in

[lib/player-service.ts:528](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L528)

---

### pause

▸ **pause**(`options?`): `void`

Pause the song being played . if index provided it will put on pause
the song at that index in the playlist, this is useful when playing multiple
songs at the same time, a feature offered by this library.
If pauseOthers is true, it will put on pause all the tracks in the playlist

#### Parameters

| Name                   | Type      |
| :--------------------- | :-------- |
| `options?`             | `Object`  |
| `options.index?`       | `number`  |
| `options.pauseOthers?` | `boolean` |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:463](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L463)

---

### play

▸ **play**(`index?`): `Promise`<number\>

Start playing. if on pause, it will resume the actual song
if not it will play the first song in the playlist.
if index param is given, it will play the song at the index.
It will resolve a promise with 1 if successfully play,
it will resolve -1 if the playlist is empty

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `index?` | `number` |

#### Returns

`Promise`<number\>

#### Defined in

[lib/player-service.ts:418](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L418)

---

### playWithOptions

▸ **playWithOptions**(`options`): `Promise`<number\>

Same as play, start playing, but with the possibility to add additional
options such as stop playing all other songs in the playlist

#### Parameters

| Name      | Type  |
| :-------- | :---- |
| `options` | `any` |

#### Returns

`Promise`<number\>

#### Defined in

[lib/player-service.ts:450](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L450)

---

### preloadPlaylist

▸ **preloadPlaylist**(): `void`

Preload all songs in the playlist, or at least 3 of them when unloadAll is true

#### Returns

`void`

#### Defined in

[lib/player-service.ts:373](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L373)

---

### prev

▸ **prev**(): `void`

Play the previously played song in the playlist if actual
song being played hasn't been played for more than 2 seconds,
otherwise it will simply restart the actual song

#### Returns

`void`

#### Defined in

[lib/player-service.ts:582](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L582)

---

### seekPerPercentage

▸ **seekPerPercentage**(`percentage`, `index?`): `void`

Jump to a given progress percentage of actual song,
if index is provided, it will make the jump on the song at the
given index in the playlist

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `percentage` | `number` |
| `index?`     | `number` |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:643](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L643)

---

### seekPerPosition

▸ **seekPerPosition**(`position`, `index?`): `void`

Jump to a given progress position in seconds of actual song,
if index is provided, it will make the jump on the song at the
given index in the playlist

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `position` | `number` |
| `index?`   | `number` |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:666](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L666)

---

### setPLaylistFromRSSFeedURL

▸ **setPLaylistFromRSSFeedURL**(`url`): `Promise`<void\>

Load a playlist from the URL of a RSS feed file

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `url` | `string` |

#### Returns

`Promise`<void\>

#### Defined in

[lib/player-service.ts:786](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L786)

---

### setPlaylistFromSongObjects

▸ **setPlaylistFromSongObjects**(`songs`): `void`

Load a playlist from Partial Song object

#### Parameters

| Name    | Type                                        |
| :------ | :------------------------------------------ |
| `songs` | `Partial`<[Song](../interfaces/song.md)\>[] |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:752](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L752)

---

### setPlaylistFromUrls

▸ **setPlaylistFromUrls**(`urls`): `void`

Load a playlist from an array of song files URI

#### Parameters

| Name   | Type       |
| :----- | :--------- |
| `urls` | `string`[] |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:739](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L739)

---

### shufflePlaylist

▸ `Private` **shufflePlaylist**(): `void`

Allows to shuffle the playlist

#### Returns

`void`

#### Defined in

[lib/player-service.ts:877](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L877)

---

### stop

▸ **stop**(`index?`): `void`

Stop the song being played, if index provided it will stop the song
at that index in the playlist

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `index?` | `number` |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:503](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L503)

---

### unload

▸ `Private` **unload**(): `void`

Unload song from memory

#### Returns

`void`

#### Defined in

[lib/player-service.ts:933](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L933)

---

### unloadSong

▸ **unloadSong**(`song`): `void`

Unload a song

#### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `song` | [Song](../interfaces/song.md) |

#### Returns

`void`

#### Defined in

[lib/player-service.ts:385](https://github.com/Redeltaz/rumblestudio/blob/bbc6b81/libs/player-service/src/lib/player-service.ts#L385)
