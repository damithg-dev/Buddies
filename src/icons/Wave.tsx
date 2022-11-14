import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {Color} from '../Color';

export function Wave({
  width,
  height,
  color = Color.PastelBlack,
  up = false,
  inline = false,
  ...rest
}: IconProps) {
  return (
    <>
      {!inline && <View style={!up ? styles.top : styles.bottom} />}
      <Svg
        width={width || 414}
        height={height || 16}
        viewBox="0 0 414 16"
        style={[!inline && styles.container, !up && styles.down]}
        {...rest}>
        <Path
          d="M0 10.233c16.967 1.72 43.107 4.16 65.189 4.16C119.149 14.393 183.866.86 252.67.067 321.474-.725 376.978 5.715 414 6.97V16H0v-5.767z"
          fill={color}
          fillRule="evenodd"
        />
      </Svg>
      {!inline && <View style={!up ? styles.bottom : styles.top} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.PastelWhite,
  },

  top: {
    backgroundColor: Color.PastelBlueLight,
  },

  bottom: {
    backgroundColor: Color.PastelWhite,
  },

  down: {
    transform: [{rotate: '180deg'}],
  },
});

export default Wave;
