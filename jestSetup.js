import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockIssues from './mocks/issues';

mockAsyncStorage.getItem = jest.fn((key, callback) => {
  if (key === 'bookmarks') {
    const json = JSON.stringify(mockIssues);

    return json;
  } else {
    callback(null);
  }
  // do something here to retrieve data
});

export default mockAsyncStorage;

jest.useFakeTimers();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation');

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
