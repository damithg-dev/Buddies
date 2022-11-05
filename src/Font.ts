import {TextStyle} from 'react-native';

export const Font = {
  Regular: 'Comfortaa-Regular',
  Medium: 'Comfortaa-Medium',
  Bold: 'Comfortaa-Bold',
  Light: 'Comfortaa-Light',
  SemiBold: 'Comfortaa-SemiBold',

  FromWeight: (weight: TextStyle['fontWeight']) => {
    switch (weight) {
      case '400':
        return Font.Light;
      case '500':
        return Font.Regular;
      case '600':
      case '700':
        return Font.SemiBold;
      case '800':
      case '900':
        return Font.Bold;
      default:
        return Font.Light;
    }
  },
};
