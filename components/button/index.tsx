import React, { Component } from 'react';
import { GestureResponderEvent, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Color } from '..';
import Text from '../text';
import styles from './styles';

export interface ButtonProps {
  text?: String;
  type?: string;
  style?: any;
  leftIcon?: JSX.Element;
  leftIconSize?: number;
  rightIcon?: any;
  onPress?: any;
  disabled?: boolean;
  loading?: boolean;
  noSpacing?: boolean;
  autoWidth?: boolean;
  nT?: boolean;
  textStyle?: TextStyle;
}

export default class Button extends React.Component<ButtonProps> {
  onPress = (e: GestureResponderEvent) => {
    this.props.onPress && this.props.onPress(e);
  };

  render() {
    const { style, textStyle, type = 'default', text = '', leftIcon, rightIcon, disabled } = this.props;

    const incomingButtonStyle = Array.isArray(style) ? style : [style];
    const incomingTextStyle = Array.isArray(textStyle) ? textStyle : [textStyle];

    return (
      <TouchableOpacity
        {...this.props}
        onPress={this.onPress}
        disabled={disabled}
        style={[
          styles.defaultButton,
          styles[type + 'Button'],
          disabled ? { borderColor: Color.border } : {},
          ...incomingButtonStyle,
        ]}
      >
        {leftIcon}
        <Text
          nT
          style={[
            styles.defaultText,
            styles[type + 'Text'],
            disabled ? { color: Color.border } : {},
            ...incomingTextStyle,
          ]}
        >
          {text.toUpperCase()}
        </Text>
        {rightIcon}
      </TouchableOpacity>
    );
  }
}
