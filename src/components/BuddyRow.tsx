import React from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import {Text, FontSize} from './Text';
import {ProfileIcons} from './ProfileIcon';
import {Color} from '../Color';

interface BuddyRowProp {
  buddy: Buddy;
  onPress: () => void;
}

export const BuddyRow = ({buddy, onPress}: BuddyRowProp) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.rootContainer}>
        <ProfileIcons
          firstName={buddy.firstName}
          lastName={buddy.lastName}
          //   url={buddy.imageUrl}
          size={45}
        />
        <View style={styles.textContainer}>
          <Text fontSize={FontSize.H3}>{`${buddy.firstName} ${
            buddy.lastName ?? ''
          }`}</Text>
          <Text>
            {buddy.phoneNo.map(({number}: PhoneNo) => number).join('/')}
          </Text>
        </View>
      </View>
      <View style={styles.separatorContainer} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  textContainer: {
    marginLeft: 16,
  },
  separatorContainer: {
    height: 1,
    backgroundColor: Color.PastelBlack,
    width: '80%',
    alignSelf: 'center',
    opacity: 0.1,
  },
});
