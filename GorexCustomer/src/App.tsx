/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/store';
import MainStack from './navigation';
import {LogBox} from 'react-native';
import Toast from 'react-native-toast-message';
import {enableScreens} from 'react-native-screens';
type IAppStates = {
  isLoading: boolean;
};
enableScreens();
LogBox.ignoreAllLogs();

const App: FC<IAppStates> = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainStack />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
