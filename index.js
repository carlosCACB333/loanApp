// import 'react-native-gesture-handler';

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import {dark} from './styles/theme';

function Main() {
  return (
    <PaperProvider theme={dark}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
