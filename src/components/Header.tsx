import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import * as Sentry from '@sentry/react-native';

import {ArrowLeftIcon, XIcon} from '../icons';
import {Color} from '../Color';
import {H2} from './H2';
import {Navigation} from '../../e2e/TestIds.json';
import {Text} from './Text';
import {Font} from './../Font';
import {scaleFont} from './../helpers/scale';

interface HeaderProps {
  title: string | {title: string; subTitle: string};
  leftIcon?: JSX.Element;
  onPressLeft?: () => void;
  rightIcon?: JSX.Element;
  onPressRight?: () => void;
  backgroundColor?: 'white' | 'peach' | 'blue-bright';
}

export const Header = ({
  title,
  backgroundColor = 'white',
  leftIcon = <ArrowLeftIcon size={24} />,
  onPressLeft,
  rightIcon = <XIcon size={24} />,
  onPressRight,
}: HeaderProps) => {
  const {top} = useSafeAreaInsets();

  const setBackgroundColor = (color: string) => color === Color.PastelWhite;

  return (
    <View
      style={[
        {paddingTop: top},
        {
          backgroundColor: setBackgroundColor(backgroundColor),
        },
      ]}>
      <StatusBar backgroundColor={setBackgroundColor(backgroundColor)} />
      <View style={styles.header}>
        <View style={styles.left}>
          {onPressLeft ? (
            <TouchableOpacity style={styles.touchable} onPress={onPressLeft}>
              {leftIcon}
            </TouchableOpacity>
          ) : (
            <View style={styles.touchable}>
              <View style={styles.placeHolderIcon} />
            </View>
          )}
        </View>

        {typeof title === 'string' ? (
          <View style={styles.content}>
            <H2 center>{title}</H2>
          </View>
        ) : (
          <View style={styles.content}>
            <Text
              center
              style={{
                fontFamily: Font.CanelaWebBold,
                fontSize: scaleFont(22),
              }}>
              {title.title}
            </Text>
            <Text
              center
              style={{
                fontFamily: Font.CircularMedium,
                fontSize: scaleFont(14),
              }}>
              {title.subTitle}
            </Text>
          </View>
        )}

        <View style={styles.right}>
          {onPressRight ? (
            <TouchableOpacity style={styles.touchable} onPress={onPressRight}>
              {rightIcon}
            </TouchableOpacity>
          ) : (
            <View style={styles.touchable}>
              <View style={styles.placeHolderIcon} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },

  left: {
    zIndex: 10,
  },

  content: {
    flex: 1,
  },

  right: {
    zIndex: 10,
  },

  touchable: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 4,
    paddingHorizontal: 22,
    paddingVertical: 32,
  },

  placeHolderIcon: {
    width: 24,
  },
});
