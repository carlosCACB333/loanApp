import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from 'react-native-paper';
import {AuthProvider} from './context/AuthContext';
import {AuthStack} from './navigations/AuthStack';
import {HomeTab} from './navigations/HomeTab';
import {Provider} from 'react-redux';
import {store} from './app/store';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const theme = useTheme();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <StatusBar backgroundColor={theme.colors.background} />
        <AuthProvider>
          {isAuth => (isAuth ? <HomeTab /> : <AuthStack />)}
        </AuthProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
