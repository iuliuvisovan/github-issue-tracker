import { Dimensions } from 'react-native';

const { width: vw, height: vh } = Dimensions.get('screen');

export { vw };
export { vh };

export { default as Button } from './button';
export { default as TextInput } from './text-input';
export { default as Text } from './text';
export { default as Color } from './color';
