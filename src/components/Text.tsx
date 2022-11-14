import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';

import {Color} from '../Color';
import {Font} from '../Font';

export enum FontSize {
  H1,
  H2,
  H3,
  P,
}

interface TextProps extends RNTextProps {
  children: any;
  center?: boolean;
  small?: boolean;
  wrap?: boolean;
  muted?: boolean;
  fontSize?: FontSize;
}

export const Text = ({
  children,
  fontSize = FontSize.P,
  center = false,
  small = false,
  wrap = false,
  muted = false,
  style,
  ...rest
}: TextProps) => {
  if (children == null || children === '') {
    return null;
  }

  const getFontSize = () => {
    switch (fontSize) {
      case FontSize.H1:
        return {fontSize: 32, fontFamily: Font.Bold, lineHeight: 36};
      case FontSize.H2:
        return {fontSize: 28, fontFamily: Font.SemiBold, lineHeight: 30};
      case FontSize.H3:
        return {fontSize: 24, fontFamily: Font.Medium, lineHeight: 26};
      case FontSize.P:
        return {fontSize: 15, fontFamily: Font.Light, lineHeight: 17};
    }
  };

  return (
    <RNText
      style={[
        textStyles.text,
        small && textStyles.small,
        center && textStyles.textCenter,
        muted && textStyles.muted,
        wrap && textStyles.textWrap,
        {...getFontSize()},
        style,
        // {fontSize: 32, fontFamily: Font.Bold, lineHeight: 36},
      ]}
      {...rest}>
      {children}
    </RNText>
  );
};

export const textStyles = StyleSheet.create({
  text: {
    color: Color.PastelBlueDark,
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
    fontSize: 14,
    lineHeight: 18,
  },

  muted: {
    color: Color.PastelGreyLight,
  },
});
