import React from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';

import { Router, Scene, Stack } from 'react-native-router-flux';

//const Scenes = Scene;

const App = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene
          key="home"
          component={HomeScreen}
          title="Home"
          hideNavBar={true}
          initial={true}
        />
        <Scene key="map" component={MapScreen} title="Map" hideNavBar={true} />
      </Stack>
    </Router>
  );
};

const styles = StyleSheet.create({});

export default App;
