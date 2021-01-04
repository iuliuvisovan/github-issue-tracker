import React from 'react';
import { GestureResponderEvent, TextStyle, TouchableOpacity, View } from 'react-native';
import Text from '../text';
import styles from './styles';

export interface ButtonProps {
  text?: String;
  type?: string;
  bulletCount?: number;
  style?: any;
  disabled?: boolean;
  leftIcon?: any;
  leftIconSize?: any;
  rightIcon?: any;
  onPress?: any;
  loadOnPress?: boolean;
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
    const {
      style,
      textStyle,
      disabled,
      type = 'default',
      text = '',
      bulletCount,
      noSpacing,
      autoWidth,
    } = this.props;

    const incomingButtonStyle = Array.isArray(style) ? style : [style];
    const incomingTextStyle = Array.isArray(textStyle) ? textStyle : [textStyle];

    return (
      <TouchableOpacity
        {...this.props}
        disabled={disabled}
        onPress={this.onPress}
        style={[
          styles.defaultButton,
          styles[type + 'Button'],
          disabled ? { opacity: 0.5, elevation: 0 } : {},
          noSpacing ? styles.noSpacing : undefined,
          autoWidth ? styles.autoWidth : undefined,
          ...incomingButtonStyle,
        ]}
      >
        <Text nT style={[styles.defaultText, styles[type + 'Text'], ...incomingTextStyle]}>
          {text.toUpperCase()}
        </Text>
        {Boolean(bulletCount) && (
          <View style={styles.bullet}>
            <Text nT style={styles.bulletText}>
              {bulletCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}
