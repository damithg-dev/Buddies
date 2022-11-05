import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Color} from '../Color';
import {Header} from '../components/Header';
import {Add} from '../icons/Add';

export const BuddyList = () => {
  const {navigate} = useNavigation();

  return (
    <View>
      <Header
        title={'Buddies'}
        rightIcon={<Add color={Color.PastelBlue} />}
        onPressRight={() => {
          navigate('');
        }}
      />
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
