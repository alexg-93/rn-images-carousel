import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = PropTypes;

const Card = ({item}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{uri: `data:image/jpg;base64,${item.base64}`}}
        />
      </TouchableOpacity>
    </View>
  );
};

Card.propTypes = {
  item: propTypes.object,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 250,
    borderRadius: 20,
  },
});

export default Card;
