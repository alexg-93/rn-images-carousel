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

const Card = ({ item, deleteFile }) => {
  const { exif } = item;
  return (
    <>
      <View style={styles.container}>
        {item && (
          <>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: item?.uri || item?.path }}
              />
            </View>

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
                title="❌"
               // color="black"
                onPress={() => deleteFile(item)}
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
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,

    elevation: 17,
  },
  locationContainer: {
    width: 250,
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 5,
  },
  locationText: {
    width: 250,
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    textAlign: 'center',
  },
  deleteButton: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 15,
    top: 5,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});

export default Card;
