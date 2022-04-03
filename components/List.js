import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types';

const propTypes = PropTypes;

export const List = ({ data }) => {

  const renderItem = ({ item }) => {
    return <Card item={item} key={item.localIdentifier} />;
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
      />
    </View>
  );
};

List.propTypes = {
  data: propTypes.array,
};

const styles = StyleSheet.create({
  carousel: {
    height: 350,
    marginTop: 50,
  },
});
