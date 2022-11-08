import React from 'react';
import FastImage from 'react-native-fast-image';
import {View, StyleSheet} from 'react-native';
import {Text} from './Text';
import {Font} from '../Font';
import {Color} from '../Color';

interface ProfileIconsProps {
  firstName: string;
  lastName?: string;
  imageUrl?: string;
  size: number;
}

export const ProfileIcon = ({
  firstName,
  lastName,
  imageUrl,
  size,
}: ProfileIconsProps) => {
  const styles = dynamicStyles(size);

  if (imageUrl) {
    return (
      <FastImage
        style={styles.rootContainer}
        key={firstName}
        source={{
          uri: imageUrl,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  } else {
    return (
      <View key={firstName} style={styles.rootContainer}>
        <Text center style={styles.nameText}>
          {lastName
            ? `${firstName.slice(0, 1)}${lastName.slice(0, 1).toUpperCase()}`
            : `${firstName.slice(0, 2)}`.toUpperCase()}
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
      alignContent: 'center',
      alignItems: 'center',
    },
    nameText: {
      marginTop: '10%',
      fontSize: size * 0.58,
      fontFamily: Font.Bold,
      lineHeight: size * 0.6,
      color: Color.PastelWhite,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
  });
