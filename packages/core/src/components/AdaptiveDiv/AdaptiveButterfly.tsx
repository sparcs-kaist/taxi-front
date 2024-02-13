import {ReactNode} from 'react';
import {View} from 'dripsy';
import {css} from '@emotion/native';

import useButterflyState from 'hooks/useButterflyState';
import AdaptiveCenter from './AdaptiveCenter';
import theme from 'tools/theme';

export type AdaptiveButterflyProps = {
  left?: ReactNode;
  right?: ReactNode;
};

const butterflyGap = 15;

const AdaptiveButterfly = ({left, right}: AdaptiveButterflyProps) => {
  const butterflyState = useButterflyState();

  if (butterflyState === 'fold' || !right)
    return <AdaptiveCenter>{left}</AdaptiveCenter>;

  const styleColumn = css`
    width: calc(
      calc(
          min(100%, ${theme.adaptivediv.butterfly_device_max_width.wide}px) -
            ${butterflyGap} - ${theme.adaptivediv.margin * 2}px
        ) / 2
    );
  `;

  return (
    <View
      sx={{
        alignContent: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      <View sx={styleColumn}>{left}</View>
      <View sx={{width: butterflyGap}} />
      <View sx={styleColumn}>{right}</View>
    </View>
  );
};

export default AdaptiveButterfly;
