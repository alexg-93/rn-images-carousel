import React from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const Map = ({ location }) => {
  const coordinates = {
    latitude: location?.latitude,
    longitude: location?.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/*Render our MapView*/}
        <MapView style={styles.map} initialRegion={coordinates}>
          <Marker coordinate={coordinates} />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    //...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    //...StyleSheet.absoluteFillObject,
    width: screenWidth,
    height: screenHeight,
  },
});

export default Map;
