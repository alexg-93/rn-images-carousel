import React, {useState, useRef} from 'react';
import {View, StyleSheet, FlatList, Animated} from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types';

const propTypes = PropTypes;

export const List = ({data}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const renderItem = ({item}) => {
    return <Card item={item} />;
  };

  return (
    <View style={styles.carousel}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled
        keyExtractor={item => item.id}
        bounces={false}
        decelerationRate={0}
        snapToAlignment="center"
        snapToInterval={340}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
      />
    </View>
  );
};

List.propTypes = {
  data: propTypes.array,
};

const styles = StyleSheet.create({
  carousel: {
    height: 300,
  },
});
