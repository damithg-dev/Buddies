import React from 'react';
import FastImage from 'react-native-fast-image';
import {View, StyleSheet} from 'react-native';
import {Text} from './Text';
import {Font} from '../Font';
import {Color} from '../Color';

interface ProfileIconsProps {
  firstName: string;
  lastName?: string;
  url?: string;
  size: number;
}

export const ProfileIcons = ({
  firstName,
  lastName,
  url,
  size,
}: ProfileIconsProps) => {
  const styles = dynamicStyles(size);

  if (url) {
    return (
      <FastImage
        style={styles.rootContainer}
        key={firstName}
        source={{
          uri: 'https://unsplash.it/400/400?image=1',
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  } else {
    return (
      <View key={firstName} style={styles.rootContainer}>
        <Text center style={styles.nameText}>
          {lastName
            ? `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`
            : `${firstName.slice(0, 2)}`}
        </Text>
      </View>
    );
  }
};

export const dynamicStyles = (size: number) =>
  StyleSheet.create({
    rootContainer: {
      overflow: 'hidden',
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: Color.PastelBlue,
      justifyContent: 'center',
    },
    nameText: {
      fontSize: size * 0.6,
      fontFamily: Font.Bold,
      lineHeight: size * 0.8,
      color: Color.PastelWhite,
    },
  });
