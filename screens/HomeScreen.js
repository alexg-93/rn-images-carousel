import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {List} from '../components/List';

const HomeScreen = () => {
  const [images, setImages] = useState(null);

  const openCamera = async () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      //includeBase64: 'true',
      includeExtra: true,
      saveToPhotos: true,
      maxWidth: 8000,
      maxHeight: 8000,
    };
    await launchCamera(options, response => {
      console.log(`response=> ${response}`);
    }).then(response => console.log(response));
  };

  const openGallery = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
      selectionLimit: 0,
    };

    launchImageLibrary(options);
    const result = await launchImageLibrary(options);
    const {assets} = result;

    if (assets) {
      setImages(assets);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => openCamera()}>
          <Text style={styles.text}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => openGallery()}>
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
