import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Color} from '../Color';

export const Add = (props: SvgProps) => (
  <Svg
    width={24}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M23.4 7.8H21V5.4c0-.33-.27-.6-.6-.6h-1.2c-.33 0-.6.27-.6.6v2.4h-2.4c-.33 0-.6.27-.6.6v1.2c0 .33.27.6.6.6h2.4v2.4c0 .33.27.6.6.6h1.2c.33 0 .6-.27.6-.6v-2.4h2.4c.33 0 .6-.27.6-.6V8.4c0-.33-.27-.6-.6-.6Zm-15 1.8a4.8 4.8 0 1 0 0-9.6 4.8 4.8 0 0 0 0 9.6Zm3.36 1.2h-.626a6.535 6.535 0 0 1-5.468 0H5.04A5.041 5.041 0 0 0 0 15.84v1.56a1.8 1.8 0 0 0 1.8 1.8H15a1.8 1.8 0 0 0 1.8-1.8v-1.56a5.041 5.041 0 0 0-5.04-5.04Z"
      fill={Color.PastelBlack}
    />
  </Svg>
);
