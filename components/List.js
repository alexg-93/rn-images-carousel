import React, { useState } from 'react';
import { View,StyleSheet,FlatList,Animated} from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types';
import CameraRoll from '@react-native-community/cameraroll';

const propTypes = PropTypes;

export const List = ({ data, setImages, isEnabled }) => {
  const renderItem = ({ item }) => {
    return (
      <Card item={item} key={item.localIdentifier} deleteFile={deleteFile} />
    );
  };

  const deleteFile = item => {
    CameraRoll.deletePhotos([`${item.localIdentifier}`]) //Promise
      .then(() => {
        const filteredImages = data.filter(
          img => img.localIdentifier !== item.localIdentifier,
        ); //filter deleted images
        setImages([...filteredImages]);
      })
      .catch(err => {
        console.log(err.message); //error on cancel delete
      });
  };

  return (
    <View style={styles.carousel}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled
        keyExtractor={item => item?.localIdentifier}
        bounces={false}
        decelerationRate={0}
        snapToAlignment="center"
        snapToInterval={320}
        scrollEventThrottle={16}
        style={isEnabled && { width: 320 }}
      />
    </View>
  );
};

List.propTypes = {
  data: propTypes.array,
};

const styles = StyleSheet.create({
  carousel: {
    //height: 400,
    marginTop: 300,
  },
});
