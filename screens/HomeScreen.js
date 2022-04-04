import { StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { List } from '../components/List';
import ImagePicker from 'react-native-image-crop-picker';
import GetLocation from 'react-native-get-location';
import CameraRoll from '@react-native-community/cameraroll';
import { launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const [images, setImages] = useState([]);

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const selectFromGallery = useCallback(() => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
      multiple: true,
      includeExif: true,
      mediaType: 'photo',
      maxFiles: 10,
    }).then(image => {
      setImages([...images, ...image]);
    });
  }, [images]);

  const takePhoto = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 8000,
      maxHeight: 8000,
      includeExtra: true,
      //saveToPhotos: true,
      storageOptions: {
        skipBackup: true,
      },
    };
    const result = await launchCamera(options);
    const { assets } = result;
    const photos = [...assets];

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(async location => {
        const { longitude, latitude } = location;
        const localIdentifier = await CameraRoll.save(photos[0].uri); //return new localIndetifier

        photos[0].exif = {};
        photos[0].exif['{GPS}'] = {
          Longitude: longitude,
          Latitude: latitude,
        };

        photos[0].localIdentifier = localIdentifier;
        setImages([...images, photos[0]]);
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }, [images]);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => takePhoto()}>
          <Text style={styles.text}>Take Picture</Text>
          <Icon name="camera-outline" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => selectFromGallery()}>
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
        <List data={images} setImages={setImages} isEnabled={isEnabled} />
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
