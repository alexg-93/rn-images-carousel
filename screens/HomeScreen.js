import { StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { List } from '../components/List';
import Icon from 'react-native-vector-icons/Ionicons';

import { takePicture, openGallery } from '../redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const imagesReducer = useSelector(state => state.imagesReducer);
  const { images } = imagesReducer;

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(takePicture())}>
          <Text style={styles.text}>Take Picture</Text>
          <Icon name="camera-outline" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(openGallery())}>
          <Text style={styles.text}>Open Gallery</Text>
          <Icon name="images-outline" size={30} color="black" />
        </TouchableOpacity>

        {images && images.length > 1 && (
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        )}
      </View>

      {images && images.length > 0 && (
        <List data={images} /*setImages={setImages}*/ isEnabled={isEnabled} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fffaf0',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  buttons: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 100,
  },
});

export default HomeScreen;
