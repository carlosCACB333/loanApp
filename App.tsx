import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from 'react-native-paper';
import {AuthContext} from './context/AuthContext';
import {Auth} from './navigations/Auth';
import {Home} from './navigations/Home';
import {Provider} from 'react-redux';
import {store} from './app/store';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const theme = useTheme();
  const {token} = useContext(AuthContext);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <StatusBar backgroundColor={theme.colors.background} />
        {token ? <Home /> : <Auth />}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
