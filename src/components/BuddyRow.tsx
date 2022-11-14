import React from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import {Text, FontSize} from './Text';
import {ProfileIcon} from './ProfileIcon';
import {Color} from '../Color';

interface BuddyRowProp {
  buddy: IBuddy;
  onPress: (buddy: IBuddy) => void;
}

export const BuddyRow = ({buddy, onPress}: BuddyRowProp) => {
  return (
    <Pressable onPress={() => onPress(buddy)}>
      <View style={styles.rootContainer}>
        <ProfileIcon
          firstName={buddy.firstName}
          lastName={buddy.lastName}
          emoji={buddy.emoji}
          size={45}
        />
        <View style={styles.textContainer}>
          <Text fontSize={FontSize.H3}>{`${buddy.firstName} ${
            buddy.lastName ?? ''
          }`}</Text>
          <View style={styles.textSeparator} />
          <Text>
            {buddy.phoneNo.map(({number}: IPhoneNo) => number).join('/')}
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
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  textContainer: {
    marginLeft: 16,
  },
  textSeparator: {
    height: 4,
  },
  separatorContainer: {
    height: 1,
    backgroundColor: Color.PastelBlack,
    width: '80%',
    alignSelf: 'center',
    opacity: 0.1,
  },
});
