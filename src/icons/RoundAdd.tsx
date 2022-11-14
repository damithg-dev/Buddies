import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const RoundAdd = (props: SvgProps) => (
  <Svg width={25} height={25} fill="none" {...props}>
    <Path
      d="M12.5 0C5.6 0 0 5.6 0 12.5S5.6 25 12.5 25 25 19.4 25 12.5 19.4 0 12.5 0Zm6.25 13.75h-5v5h-2.5v-5h-5v-2.5h5v-5h2.5v5h5v2.5Z"
      fill="#000"
    />
  </Svg>
);
