import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {Color} from '../Color';
import {Header} from '../components/Header';
import {Add} from '../icons/Add';
import {BuddyRow} from '../components/BuddyRow';
import {NavigatorParamList} from '../../App';

export const BuddyList = () => {
  const {navigate} =
    useNavigation<NavigationProp<NavigatorParamList, 'List'>>();
  const temp: Buddy = {
    firstName: 'Damith Amarasinghe',
    phoneNo: [
      {
        number: '0123456789',
        type: 'Home',
      },
      {
        number: '0123456789',
        type: 'Mobile',
      },
    ],
  };
  const array = [temp, temp, temp, temp, temp, temp, temp, temp, temp, temp];

  const onPressBuddy = (buddy: Buddy) => {
    navigate('Details', {
      buddy,
    });
  };

  return (
    <View style={styles.rootContainer}>
      <Header
        title={'Buddies'}
        rightIcon={<Add color={Color.PastelBlue} />}
        onPressRight={() => {
          navigate('Create');
        }}
        backgroundColor={'white'}
      />
      <View style={styles.listContainer}>
        <FlashList
          renderItem={({item}) => {
            return (
              <BuddyRow
                buddy={item as unknown as Buddy}
                onPress={onPressBuddy}
              />
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
