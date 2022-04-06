import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';

const ExploreScreen = ({ locations }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Explore all points! coming soon..</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ExploreScreen;
