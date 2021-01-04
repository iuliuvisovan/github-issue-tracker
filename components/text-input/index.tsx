import Text from '../text';
import Color from '../color';

import * as React from 'react';
import { Dimensions, TextInput, TextInputProps, View } from 'react-native';
import styles from './styles';

export default function styledTextInput(props: StyledTextInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  const { halfWidth, name, style } = props;

  return (
    <View
      style={[styles.wrapper, halfWidth ? { width: (Dimensions.get('screen').width - (32 + 8 + 32 + 8)) / 2 } : {}]}
    >
      <View pointerEvents="none" style={[styles.row, { zIndex: 1 }]}>
        <View style={styles.overlappingWrapper}>
          <Text style={styles.overlappingText}>{name}</Text>
        </View>
      </View>
      <TextInput
        placeholderTextColor={Color.border}
        {...props}
        autoCapitalize="none"
        style={[styles.input, { borderColor: isFocused ? Color.blue : Color.border }, style]}
        returnKeyType="done"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

export interface StyledTextInputProps extends TextInputProps {
  name: string;
  initialValue?: string;
  halfWidth?: boolean;
}
