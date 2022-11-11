import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {Color} from '../Color';
import {Header} from '../components/Header';
import {Add} from '../icons/Add';
import {BuddyRow} from '../components/BuddyRow';
import {NavigatorParamList} from '../../App';
import {useService} from '../realm/Service';

export const BuddyList = () => {
  const {navigate} =
    useNavigation<NavigationProp<NavigatorParamList, 'List'>>();
  const {buddies, create} = useService();
  console.log('buddies', buddies.length);
  const temp: IBuddy = {
    firstName: 'yyyyyyy Amarasinghe',
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

  const onPressBuddy = (buddy: IBuddy) => {
    // create(buddy);
    // navigate('Details', {
    //   buddy,
    // });
  };

  return (
    <View style={styles.rootContainer}>
      <Header
        title={'Buddies'}
        rightIcon={<Add color={Color.PastelBlue} />}
        onPressRight={() => {
          // navigate('Create');
          create(temp);
        }}
        backgroundColor={'white'}
      />
      <View style={styles.listContainer}>
        <FlashList
          renderItem={({item}) => {
            return (
              <BuddyRow
                buddy={item as unknown as IBuddy}
                onPress={onPressBuddy}
              />
            );
          }}
          estimatedItemSize={78}
          data={buddies}
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
