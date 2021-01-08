import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Color from '../color';
import Text from '../text';
import styles from './styles';

export interface ButtonProps {
  text?: String;
  type?: 'secondary' | 'tertiary' | 'quaternary';
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}

export default function styledButton(props: TouchableOpacityProps & ButtonProps) {
  const { style, type = 'default', text, leftIcon, rightIcon, disabled } = props;

  const buttonStyle = [
    styles.baseButton,
    styles[(type + 'Button') as keyof ButtonStyle],
    disabled ? { borderColor: Color.border } : {},
    style,
  ];

  const buttonTextStyle = [styles.defaultText, styles[(type + 'Text') as keyof ButtonTextStyle], disabled ? { color: Color.border } : {}];

  return (
    <TouchableOpacity {...props} style={buttonStyle}>
      {leftIcon}
      {Boolean(text) && <Text style={buttonTextStyle}>{text.toUpperCase()}</Text>}
      {rightIcon}
    </TouchableOpacity>
  );
}

interface ButtonStyle {
  secondaryButton: object;
  tertiaryButton: object;
  quaternaryButton: object;
}

interface ButtonTextStyle {
  tertiaryText: object;
  quaternaryText: object;
}
