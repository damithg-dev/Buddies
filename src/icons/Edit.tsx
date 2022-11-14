import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Color} from '../Color';

export const Edit = (props: SvgProps) => (
  <Svg width={26} height={21} fill="none" {...props}>
    <Path
      d="M9.416 10.337a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm3.5 1.25h-.652a6.808 6.808 0 0 1-5.695 0h-.653a5.251 5.251 0 0 0-5.25 5.25v1.625c0 1.035.84 1.875 1.875 1.875H13.28a1.876 1.876 0 0 1-.102-.832l.265-2.38.047-.433.309-.308 3.02-3.02a5.197 5.197 0 0 0-3.903-1.777Zm1.77 5.675-.266 2.383a.622.622 0 0 0 .688.688l2.378-.266 5.387-5.387-2.8-2.8-5.387 5.382Zm10.707-6.421-1.48-1.48a.936.936 0 0 0-1.321 0l-1.477 1.476-.16.16 2.805 2.8 1.633-1.632a.94.94 0 0 0 0-1.324Z"
      fill={Color.PastelBlueDark}
    />
  </Svg>
);
