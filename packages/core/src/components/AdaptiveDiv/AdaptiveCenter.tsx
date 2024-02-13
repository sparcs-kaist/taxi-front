import {ReactNode} from 'react';
import {View} from 'dripsy';
import {css} from '@emotion/native';

import theme from 'tools/theme';

export type AdaptiveCenterProps = {
  children?: ReactNode;
};

const AdaptiveCenter = ({children, ...divProps}: AdaptiveCenterProps) => (
  <View
    sx={css`
      position: relative;
      width: calc(
        min(${theme.adaptivediv.center_device_max_width}px, 100%) -
          ${theme.adaptivediv.margin * 2}px
      );
      margin: auto;
    `}
    {...divProps}>
    {children}
  </View>
);

export default AdaptiveCenter;
