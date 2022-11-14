import {StyleSheet, ViewStyle, StyleProp} from 'react-native';

import {Color} from './Color';

const shadowStyle: StyleProp<ViewStyle> = {
  shadowColor: Color.PastelGreyDark,
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 5,
  zIndex: 10,
};

export const Styles = StyleSheet.create({
  shadowDefault: {
    ...shadowStyle,
  },

  shadowCenter: {
    ...shadowStyle,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});
