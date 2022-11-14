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

type NavigationProps = NavigationProp<NavigatorParamList, 'List'>;

export const BuddyList = () => {
  const {navigate} = useNavigation<NavigationProps>();
  const {buddies} = useService();

  const onPressBuddy = (buddy: IBuddy) => {
    navigate('Details', {
      buddy,
    });
  };

  return (
    <View style={styles.rootContainer}>
      <Header
        title={'Buddies'}
        rightIcon={<Add />}
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
