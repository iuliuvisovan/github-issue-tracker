import * as React from 'react';
import { Text, TextProps } from 'react-native';

export default function styledText(props: TextProps & { children?: React.ReactNode }) {
  const defaultStyle = { fontFamily: 'muli', lineHeight: 16, color: '#14181c' };
  const incomingStyle = Array.isArray(props.style) ? props.style : [props.style];

  return <Text {...props} children={props.children} style={[defaultStyle, ...incomingStyle]} />;
}
