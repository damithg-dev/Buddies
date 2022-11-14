import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Color} from '../Color';

export const RoundRemove = (props: SvgProps) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M12.5 0C5.588 0 0 5.588 0 12.5 0 19.413 5.588 25 12.5 25 19.413 25 25 19.413 25 12.5 25 5.588 19.413 0 12.5 0Zm6.25 16.988-1.762 1.762-4.488-4.488-4.488 4.488-1.762-1.762 4.488-4.488L6.25 8.012 8.012 6.25l4.488 4.488 4.488-4.488 1.762 1.762-4.488 4.488 4.488 4.488Z"
      fill={Color.PastelRed}
    />
  </Svg>
);
