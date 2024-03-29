import React from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ExploreScreen from './screens/ExploreScreen';
import { Router, Scene, Stack, Tabs } from 'react-native-router-flux';

import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Stack key="root">
          <Tabs
            key="tabbar"
            tabs={true}
            hideNavBar
            tabBarStyle={styles.tabBarStyle}>
            <Scene
              key="home"
              component={HomeScreen}
              title="Home"
              hideNavBar={true}
              initial={true}
            />
            <Scene
              key="explore"
              component={ExploreScreen}
              title="Explore"
              hideNavBar={true}
            />
          </Tabs>

          <Scene
            key="map"
            component={MapScreen}
            title="Map"
            hideNavBar={true}
          />
        </Stack>
      </Router>
    </Provider>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'white',
    height: 40,
  },
});

export default App;
