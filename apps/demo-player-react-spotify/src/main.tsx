import React from 'react';
import ReactDOM from 'react-dom';
import '@rumblestudio/player-service';

import Home from './app/components/spotify/home';
import Service, { BR } from './Service';

ReactDOM.render(
	<React.StrictMode>
		<Service.Provider value={BR}>
			<Home />
		</Service.Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
