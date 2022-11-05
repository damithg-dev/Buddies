import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../components/Text';

export const BuddyCreate = () => {
  return (
    <View style={styles.root}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
