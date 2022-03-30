import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { List } from '../components/List';
import ImagePicker from 'react-native-image-crop-picker';

const HomeScreen = () => {
  const [fromGallery, setFromGallery] = useState([]);
  const [fromCamera, setFromCamera] = useState([]);
  const [images, setImages] = useState([]);

  // useEffect(() => {
  //   setImages([...fromGallery, ...fromCamera]);
  // }, [fromCamera.length, fromGallery.length]);

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
      const galleryImages = [];
      image.map(img => {
        const data = img?.exif; //Object with data

        if (data['{GPS}']) {
          const metadata = data['{GPS}']; // get the index of the json or parse it to object first with JSON.parse()
          const { Longitude, Latitude } = metadata;

          //TODO : use this coordinates and show them
        }
        galleryImages.push(img);
        setImages([...images, ...fromGallery, ...fromCamera, ...galleryImages]);
      });

      //setFromGallery([...fromGallery, ...galleryImages]);
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: false,
      includeExif: true,
      mediaType: 'photo',
      //forceJpg: true,
      writeTempFile: false,
    }).then(image => {
      // setFromCamera([...fromCamera, image]);
      setImages([...images, ...fromCamera, ...fromGallery, image]);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => openCamera()}>
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
