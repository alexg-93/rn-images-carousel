import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

const MapScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backToHomeButton}
        onPress={() => Actions.home()}>
        <Icon name="arrow-back-circle-outline" size={45} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backToHomeButton: {
    width: 50,
    height: 50,
    left: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapScreen;
