import { StyleSheet } from 'react-native';
import Color from '../color';

export default StyleSheet.create({
  wrapper: {
    marginVertical: 12,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 6,
    height: 39,
    fontFamily: 'muli',
    paddingRight: 25,
    paddingLeft: 13,
  },
  iconWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    right: -2,
    zIndex: 1,
    padding: 10,
    width: 42,
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
  },
  clearIconWrapper: {
    right: -5,
    top: -2,
  },
  clearIcon: {
    width: 14,
    height: 14,
    marginRight: 8,
    marginTop: 2,
  },
  secure: {
    tintColor: '#16c65daa',
  },
  disabled: {
    color: '#aab2ba',
    borderColor: '#aab2ba66',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlappingWrapper: {
    backgroundColor: Color.white,
    position: 'absolute',
    top: -8,
    left: 0,
    borderRadius: 8,
    paddingHorizontal: 6,
    zIndex: 20,
    marginLeft: 6,
  },
  overlappingText: {
    fontFamily: 'muli-semi-bold',
    color: '#aab2ba',
    fontSize: 12,
  },
});
