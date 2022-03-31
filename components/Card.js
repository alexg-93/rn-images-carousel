import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = PropTypes;

const Card = ({ item }) => {
  const { exif } = item;

  return (
    <>
      <View style={styles.container}>
        {item && (
          <>
            <TouchableOpacity>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: item?.path }}
                // source={{ uri: item?.uri }}
                //source={{uri: `data:image/jpg;base64,${item.base64}`}}
              />
            </TouchableOpacity>

            {exif['{GPS}'] && (
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
});

export default Card;
