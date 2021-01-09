import { Color } from '../../components';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Color.pageBackground,
  },
  noBookmarks: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
    alignSelf: 'center',
  },
  noBookmarksText: {
    color: Color.border,
    marginTop: 32,
  },
});
