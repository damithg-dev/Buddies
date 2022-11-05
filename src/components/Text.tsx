import React from 'react';
import {Text as RNText, TextProps, StyleSheet, TextStyle} from 'react-native';

import {Color} from '../Color';
import {Font} from '../Font';
import {scaleFont} from '../helpers/scale';

interface Props extends TextProps {
  children: any;
  center?: boolean;
  small?: boolean;
  wrap?: boolean;
  muted?: boolean;
}

export const Text = ({
  children,
  center = false,
  small = false,
  wrap = false,
  muted = false,
  style,
  ...rest
}: Props) => {
  if (children == null || children === '') {
    return null;
  }

  const fontWeight =
    style && (style as TextStyle).fontWeight
      ? (style as TextStyle).fontWeight
      : '400';

  return (
    <RNText
      style={[
        textStyles.text,
        small && textStyles.small,
        center && textStyles.textCenter,
        muted && textStyles.muted,
        wrap && textStyles.textWrap,
        {fontFamily: Font.FromWeight(fontWeight)},
        style,
      ]}
      {...rest}>
      {children}
    </RNText>
  );
};

export const textStyles = StyleSheet.create({
  text: {
    fontFamily: Font.CircularBook,
    fontSize: scaleFont(16),
    color: Color.PurpleDark,
    lineHeight: 24,
  },

  textCenter: {
    textAlign: 'center',
  },

  textWrap: {
    flex: 1,
    flexWrap: 'wrap',
  },

  small: {
    fontSize: scaleFont(14),
    lineHeight: 18,
  },

  muted: {
    color: Color.Purple,
  },
});
