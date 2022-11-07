import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../components/Header';
import {Text} from '../components/Text';
import {ArrowLeft} from '../icons/ArrowLeft';

export const BuddyDetail = () => {
  return (
    <View style={styles.root}>
      <Header title={''} rightIcon={<ArrowLeft />} onPressLeft={() => {}} />
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
