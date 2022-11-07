import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {Color} from '../Color';
import {Header} from '../components/Header';
import {Add} from '../icons/Add';
import {BuddyRow} from '../components/BuddyRow';

export const BuddyList = () => {
  const {navigate} = useNavigation();
  const temp: Buddy = {
    firstName: 'Lol',
    phoneNo: [
      {
        number: '0123456789',
        type: 'Home',
      },
    ],
  };
  const array = [temp, temp, temp, temp, temp, temp, temp, temp, temp, temp];

  return (
    <View style={styles.rootContainer}>
      <Header
        title={'Buddies'}
        rightIcon={<Add color={Color.PastelBlue} />}
        onPressRight={() => {
          // navigate('');
        }}
      />
      <View style={styles.listContainer}>
        <FlashList
          renderItem={({item}) => {
            console.log('item', item);
            return (
              <BuddyRow buddy={item as unknown as Buddy} onPress={() => {}} />
            );
          }}
          estimatedItemSize={78}
          data={array}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});
