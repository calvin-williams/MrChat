// support tap events
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// import material component styles
require('!!style!css!normalize.css/normalize.css');
require('!!style!css!material-components/lib/index.css');

// load the signals
import './signals/driver';
import './signals/human';

// get the controller
import controller from './controller';

// load the app
import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'cerebral-react';
import Application from './components/application.js';

ReactDOM.render(<Container controller={controller} app={Application}/>, document.getElementById('root'));
