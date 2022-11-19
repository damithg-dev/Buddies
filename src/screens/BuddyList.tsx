import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {Color} from '../Color';
import {Header} from '../components/Header';
import {Add} from '../icons/Add';
import {BuddyRow} from '../components/BuddyRow';
import {NavigatorParamList} from '../../App';
import {useService} from '../realm/Service';
import {SearchInput} from '../components/SearchInput';
import {normalizeString} from '../helpers/search';
import {Pressable} from '../components/Pressable';

type NavigationProps = NavigationProp<NavigatorParamList, 'List'>;

export const BuddyList = () => {
  const {navigate} = useNavigation<NavigationProps>();
  const {buddies} = useService();
  const [searchQuery, setSearchQuery] = useState('');

  const onPressBuddy = useCallback(
    (buddy: IBuddy) => {
      navigate('Details', {
        buddy,
      });
    },
    [navigate],
  );

  const filterOnSearchQuery = (buddy: IBuddy) => {
    if (searchQuery.length <= 2) {
      return true;
    }

    const query = normalizeString(searchQuery);
    if (normalizeString(buddy.firstName).includes(query)) {
      return true;
    } else if (normalizeString(buddy.lastName ?? '').includes(query)) {
      return true;
    } else if (normalizeString(buddy.email ?? '').includes(query)) {
      return true;
    } else if (
      normalizeString(
        buddy.phoneNo.map(({number}) => number).join(',') ?? '',
      ).includes(query)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const renderItem = useCallback(
    ({item}: any) => {
      return (
        <BuddyRow buddy={item as unknown as IBuddy} onPress={onPressBuddy} />
      );
    },
    [onPressBuddy],
  );

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
      <View style={styles.searchContainer}>
        <SearchInput
          value={searchQuery}
          onChange={string => setSearchQuery(string)}
        />
      </View>

      <View style={styles.listContainer}>
        <FlashList
          renderItem={renderItem}
          estimatedItemSize={78}
          data={buddies.filter(filterOnSearchQuery)}
        />
      </View>
      <Pressable
        onPress={() => navigate('Create')}
        style={styles.floatingButton}>
        <Add color={Color.PastelWhite} />
      </Pressable>
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
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: Color.PastelWhite,
    padding: 4,
  },

  floatingButton: {
    position: 'absolute',
    bottom: 48,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 10000,
    backgroundColor: Color.PastelBlueLight,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
