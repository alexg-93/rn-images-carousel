import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
const propTypes = PropTypes;
import CameraRoll from '@react-native-community/cameraroll';

const Card = ({ item }) => {
  const { exif } = item;

  const deleteFile = () => {
    try {
      CameraRoll.deletePhotos([`${item.localIdentifier}`]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {item && (
          <>
            <TouchableOpacity>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: item?.uri || item?.path }}
              />
            </TouchableOpacity>

            {exif && exif['{GPS}'] && (
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>
                  Longitude :{' '}
                  {exif['{GPS}'].Longitude || exif['{GPS}'].longitude}
                </Text>
                <Text style={styles.locationText}>
                  Latitude : {exif['{GPS}'].Latitude || exif['{GPS}'].latitude}
                </Text>
              </View>
            )}

            <View style={styles.deleteButton}>
              <Button
                title="Delete"
                color="black"
                onPress={() => deleteFile()}
              />
            </View>
          </>
        )}
      </View>
    </>
  );
};

Card.propTypes = {
  item: propTypes.object,
};

const styles = StyleSheet.create({
  container: {
    //justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 300,
    height: 250,
    borderRadius: 20,
  },
  locationContainer: {
    width: 300,
    flexDirection: 'column',
    border: 1,
    borderColor: 'black',
    marginTop: 5,
  },
  locationText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  deleteButton: {
    width: 100,
    height: 40,
    borderRadius: 10,
    textAlign: 'center',
    borderWidth: 1,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default Card;
