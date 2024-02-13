import theme from 'tools/theme';

import {Pressable, Text, View} from 'dripsy';

type ButtonShareProps = {
  text: string;
  icon: React.ReactNode;
  background: string;
  onClick?: () => void;
};

const ButtonShare = ({text, icon, background, onClick}: ButtonShareProps) => (
  <Pressable sx={{width: '45px', cursor: 'pointer'}} onPress={onClick}>
    <View
      sx={{
        width: '45px',
        height: '45px',
        borderRadius: 6,
        backgroundColor: background,
        boxShadow: theme.shadow_gray_button_inset,
        color: theme.gray_text,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {icon}
    </View>
    <Text
      sx={{
        color: theme.gray_text,
        textAlign: 'center',
        paddingTop: '4px',
        ...theme.font10,
      }}>
      {text}
    </Text>
  </Pressable>
);

export default ButtonShare;
