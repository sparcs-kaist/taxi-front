import {ReactNode} from 'react';
import {Pressable} from 'dripsy';

import theme from 'tools/theme';

export type AdaptiveModalProps = {
  width?: number;
  children: ReactNode;
};

const AdaptiveModal = ({
  width = theme.modal_width,
  children,
}: AdaptiveModalProps) => {
  return (
    <Pressable
      sx={{
        width:
          width < width - 2 * theme.adaptivediv.margin
            ? width
            : width - 2 * theme.adaptivediv.margin,
      }}
      onPress={e => e.stopPropagation()}
      onPressOut={e => e.stopPropagation()}>
      {children}
    </Pressable>
  );
};

export default AdaptiveModal;
