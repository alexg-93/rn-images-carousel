import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { List } from '../components/List';
import ImagePicker from 'react-native-image-crop-picker';
import GetLocation from 'react-native-get-location';
import CameraRoll from '@react-native-community/cameraroll';
import { launchCamera } from 'react-native-image-picker';

const HomeScreen = () => {
  const [images, setImages] = useState([]);

  const selectFromGallery = () => {
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
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: false,
      includeExif: true,
      mediaType: 'photo',
    }).then(image => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          image.exif['{GPS}'] = location;
          setImages([...images, image]);
          CameraRoll.save(image.path);
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        });
    });
  };

  const takePhoto = async () => {
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => takePhoto()}>
          <Text style={styles.text}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => selectFromGallery()}>
          <Text style={styles.text}>Open Gallery</Text>
        </TouchableOpacity>
      </View>

      {images && images.length > 0 && <List data={images} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'center',
    marginBottom: 10,
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
