import {View} from 'dripsy';

import theme from 'tools/theme';

type Direction = 'row' | 'column';

type LineProps = {
  direction?: Direction;
  margin?: Exclude<
    Margin,
    `${PixelValue}` | `${PixelValue} ${PixelValue} ${PixelValue} ${PixelValue}`
  >;
};

const DottedLine = ({
  direction = 'row',
  margin = '0 0',
  ...divProps
}: LineProps) => {
  const wrapper = {
    height: direction === 'row' ? 1 : '100%',
    width: direction === 'row' ? '100%' : 1,
    overflow: 'hidden',
    margin: margin,
  };
  const line = {
    height: direction === 'row' ? undefined : '99%',
    width: direction === 'row' ? '99%' : undefined,
    borderColor: theme.gray_line,
    borderStyle: 'dotted',
    marginLeft: direction === 'row' ? '-2px' : undefined,
    marginTop: direction === 'column' ? '-2px' : undefined,
    overflow: 'hidden',
    borderWidth: 5,
  };
  return (
    <View sx={wrapper}>
      <View sx={line} />
    </View>
  );
};

export default DottedLine;
