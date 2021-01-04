import * as React from 'react';
import { Text, TextProperties } from 'react-native';

export interface TextProps extends TextProperties {
  children?: any;
  t?: Boolean;
  nT?: Boolean;
}

export default (props: TextProps) => {
  const defaultStyle = { fontFamily: 'muli', lineHeight: 16, color: '#14181c' };
  const incomingStyle = Array.isArray(props.style) ? props.style : [props.style];

  return <Text nT {...props} style={[defaultStyle, ...incomingStyle]} />;
};
